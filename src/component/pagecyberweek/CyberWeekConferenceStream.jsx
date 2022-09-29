import React from "react";
import "./CyberWeekConferenceStream.css";
import { renderToString } from "react-dom/server";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Calendar } from "react-big-calendar";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Speaker from "../item/Speaker.jsx";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class CyberWeekConferenceStream extends React.Component {
	constructor(props) {
		super(props);

		const defaultRooms = ["Main Stage", "Cyber & Threat Intelligence Stage"];

		this.state = {
			events: null,
			speakers: null,
			speakerRelationships: null,
			speakerEntities: null,
			entityRelationshipTypes: null,
			selectedDate: null,
			dates: null,
			rooms: defaultRooms,
			roomStatus: defaultRooms.map(() => (true)),
			view: "agenda",
		};
	}

	componentDidMount() {
		this.requestEventsAndSpeakers();
		this.requestEntityRelationshipTypes();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.requestEventsAndSpeakers();
		}

		if (this.state.entityRelationshipTypes && this.state.speakers && !this.state.speakerEntities) {
			this.requestEntitiesOfSpeakers(this.state.speakers.map((s) => s.id));
		}
	}

	requestEventsAndSpeakers() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "EVENT CATEGORY")
				.filter((v) => v.name === "CSWL 2022");

			if (values.length > 0) {
				const params = dictToURI({
					type: "EVENT",
					include_tags: "true",
					order_by: "start_date",
					order: "asc",
					taxonomy_values: values[0].id,
				});

				getRequest.call(this, "public/get_public_articles?" + params, (data) => {
					this.setState({ events: data }, () => {
						const dates = this.getDates();

						this.setState({
							dates,
							selectedDate: dates ? dates[0] : dates,
						}, () => {
							const params2 = {
								ids: [].concat(...data.items.map((e) => e.entity_tags)),
							};

							if (params2.ids.length > 0) {
								getRequest.call(this, "public/get_public_entities?" + dictToURI(params2), (data2) => {
									this.setState({
										speakers: data2,
									});
								}, (response) => {
									nm.warning(response.statusText);
								}, (error) => {
									nm.error(error.message);
								});
							}
						});
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	requestEntitiesOfSpeakers(speakerIds) {
		const params = dictToURI({ ids: speakerIds });

		getRequest.call(this, "public/get_public_entity_relationships?" + params, (data) => {
			this.setState({ speakerRelationships: data }, () => {
				const params2 = dictToURI({ ids: data.map((e) => e.entity_id_2) });

				getRequest.call(this, "public/get_public_entities?" + params2, (data2) => {
					this.setState({
						speakerEntities: data2,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	requestEntityRelationshipTypes() {
		getRequest.call(this, "public/get_public_entity_relationship_types", (data) => {
			this.setState({
				entityRelationshipTypes: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getDates() {
		if (this.state.events) {
			return [...new Set(this.state.events.items
				.filter((e) => e.start_date)
				.map((e) => (e.start_date.substring(0, 10)))),
			].sort();
		}

		return null;
	}

	shouldEventBeDisplayed(e) {
		for (let i = 0; i < this.state.roomStatus.length; i++) {
			if (this.state.roomStatus[i] && e.abstract
				&& e.abstract.toLowerCase().includes(this.state.rooms[i].replace("&", "&amp;").toLowerCase())) {
				return true;
			}
		}

		return false;
	}

	clickOnEvent(event) {
		if (event.link && event.link.length > 0) {
			window.open(event.link);
		} else {
			this.props.history.push("/event/" + event.handle);
		}
	}

	changeRoomStatus(pos) {
		this.setState({ roomStatus: this.state.roomStatus.map((_, i) => pos === i) });
	}

	getOperatorRelationshipTypeId() {
		if (!this.state.entityRelationshipTypes) {
			return null;
		}

		const type = this.state.entityRelationshipTypes
			.filter((t) => t.name === "IS OPERATOR OF");

		if (type.length > 0) {
			return type[0].id;
		}

		return null;
	}

	getEntitiesOfSpeaker(speakerId) {
		if (!this.state.speakerEntities
			|| !this.state.entityRelationshipTypes
			|| !this.state.speakerRelationships) {
			return [];
		}

		const entityIds = this.state.speakerRelationships
			.filter((r) => r.type === this.getOperatorRelationshipTypeId())
			.filter((r) => r.entity_id_1 === speakerId)
			.map((r) => (r.entity_id_2));

		console.log(speakerId, entityIds);

		return this.state.speakerEntities
			.filter((e) => entityIds.includes(e.id));
	}

	setAllRoomsAsSelected() {
		this.setState({ roomStatus: this.state.rooms.map(() => true) });
	}

	// eslint-disable-next-line class-methods-use-this
	getEventContent(e) {
		const content = <div>
			<div className="col-md-12">
				<div className='event-title'>
					<b>{e.title}</b>
				</div>
				{e.abstract
					&& <div className='event-abstract'>
						<div dangerouslySetInnerHTML={{
							__html: dompurify.sanitize(e.abstract),
						}} />
					</div>
				}
			</div>

			{this.state.view === "agenda"
				&& <div className="col-md-12 event-speakers">
					{e.entity_tags.map((c) => {
						if (this.state.speakers) {
							const speakers = this.state.speakers.filter((u) => u.id === c);

							if (speakers.length > 0) {
								return <div className="col-md-12">
									<Speaker
										info={speakers[0]}
										entities={this.getEntitiesOfSpeaker(speakers[0].id)}
										disableLink={true}
									/>
								</div>;
							}
						}

						return "";
					})}
				</div>
			}
		</div>;

		return <div dangerouslySetInnerHTML={{
			__html:
			dompurify.sanitize(renderToString(content)),
		}} />;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"CyberWeekConferenceStream"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Conference stream</h2>
					</div>

					<div className="col-md-12">
						<p>
							If you wish to contribute content (topic(s) and/or speaker(s)),
							please reach out to us at <a href="mailto:info@cybersecurityweek.lu">info@cybersecurityweek.lu</a>.
						</p>
					</div>

					<div className="col-md-6 CyberWeekConferenceStream-dates">
						{this.state.view === "day"
							&& this.state.dates
							&& this.state.dates.map((d) => (
								<CheckBox
									key={d}
									label={d}
									value={d === this.state.selectedDate}
									onClick={() => this.changeState("selectedDate", d)}
								/>
							))
						}
					</div>

					<div className="col-md-6 CyberWeekConferenceStream-rooms">
						<CheckBox
							className={"CyberWeekConferenceStream-rooms-all"}
							key={"all"}
							label={"All Stages"}
							value={this.state.roomStatus.filter((s) => s).length
								=== this.state.rooms.length}
							onClick={() => this.setAllRoomsAsSelected()}
						/>
						{this.state.rooms
							&& this.state.rooms.map((d, i) => (
								<CheckBox
									className={"CyberWeekConferenceStream-rooms-" + i}
									key={d}
									label={d}
									value={this.state.roomStatus[i]}
									onClick={() => this.changeRoomStatus(i)}
								/>
							))
						}
					</div>

					{this.state.events !== null
						&& this.state.events.pagination.total > 0
						&& this.state.dates
						&& <div className="col-md-12 row-spaced">
							<Calendar
								events={this.state.events.items
									.filter((e) => this.shouldEventBeDisplayed(e))
									.map((e) => (
										{
											title: this.getEventContent(e),
											start: new Date(e.start_date),
											end: new Date(e.end_date),
											handle: e.handle,
											link: e.link,
										}
									))
								}
								components={{
									agenda: {
										event: (event) => (
											<div onClick={() => this.clickOnEvent(event.event)}>
												{event.title}
											</div>
										),
									},
								}}
								step={15}
								date={this.state.view === "day" ? this.state.selectedDate : this.state.dates[0]}
								defaultDate={this.state.dates[0] || new Date()}
								style={{
									height: "auto",
									backgroundColor: "white",
								}}
								onSelectEvent={(event) => this.clickOnEvent(event)}
								showAllEvents={true}
								view={this.state.view}
								views={["day", "agenda"]}
								onView={(v) => this.changeState("view", v)}
								min={this.state.selectedDate
									? new Date(this.state.selectedDate + "T09:00:00") : undefined}
								max={this.state.selectedDate
									? new Date(this.state.selectedDate + "T23:59:00") : undefined}
								eventPropGetter={(event) => {
									let color = "lightgrey";

									if (event.title
										&& event.title.props && event.title.props.dangerouslySetInnerHTML
										// eslint-disable-next-line no-underscore-dangle
										&& event.title.props.dangerouslySetInnerHTML.__html
										// eslint-disable-next-line no-underscore-dangle
										&& event.title.props.dangerouslySetInnerHTML.__html) {
										// eslint-disable-next-line no-underscore-dangle
										if (event.title.props.dangerouslySetInnerHTML.__html
											.toLowerCase().includes("main stage")) {
											color = "#8fddff";
										// eslint-disable-next-line no-underscore-dangle
										} else if (event.title.props.dangerouslySetInnerHTML.__html
											.toLowerCase().includes("cyber &amp; threat intelligence stage")) {
											color = "#ffa8b0";
										}
									}

									return {
										style: {
											backgroundColor: color,
										},
									};
								}}
							/>
						</div>
					}

					{this.state.events
						&& this.state.events.pagination.total === 0
						&& <div className="col-md-12">
							<Message
								text={"No event found"}
								height={300}
							/>
						</div>
					}

					{!this.state.events
						&& <div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					}
				</div>
			</div>
		);
	}
}
