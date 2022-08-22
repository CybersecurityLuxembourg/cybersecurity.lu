import React from "react";
import "./CyberWeekConferenceStream.css";
import { renderToString } from "react-dom/server";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Company from "../item/Company.jsx";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

const localizer = momentLocalizer(moment);

export default class CyberWeekConferenceStream extends React.Component {
	constructor(props) {
		super(props);

		const defaultRooms = ["Conference Room 1", "Conference Room 2"];

		this.state = {
			events: null,
			entities: null,
			selectedDate: null,
			dates: null,
			rooms: defaultRooms,
			roomStatus: defaultRooms.map(() => (true)),
			view: "agenda",
		};
	}

	componentDidMount() {
		this.requestEvents();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.requestEvents();
		}
	}

	requestEvents() {
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
					this.setState({
						events: data,
					}, () => {
						const dates = this.getDates();

						this.setState({
							dates,
							selectedDate: dates ? dates[0] : dates,
						}, () => {
							const params2 = {
								ids: [].concat(...data.items.map((e) => e.company_tags)),
							};

							if (params2.ids.length > 0) {
								getRequest.call(this, "public/get_public_companies?"
									+ dictToURI(params2), (data2) => {
									this.setState({
										entities: data2,
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
				&& e.abstract.toLowerCase().includes(this.state.rooms[i].toLowerCase())) {
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
					{e.company_tags.map((c) => {
						if (this.state.entities) {
							const entities = this.state.entities.filter((u) => u.id === c);

							if (entities.length > 0) {
								return <div className="col-md-12">
									<Company
										info={entities[0]}
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
							label={"All rooms"}
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
								localizer={localizer}
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
											.toLowerCase().includes("conference room 1")) {
											color = "#8fddff";
										// eslint-disable-next-line no-underscore-dangle
										} else if (event.title.props.dangerouslySetInnerHTML.__html
											.toLowerCase().includes("conference room 2")) {
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
