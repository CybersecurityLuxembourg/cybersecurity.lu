import React from "react";
import "./CyberWeekProgramme.css";
import dompurify from "dompurify";
import { NotificationManager as nm } from "react-notifications";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

const localizer = momentLocalizer(moment);

export default class CyberWeekPresentation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
			selectedDate: null,
			dates: null,
			view: window.screen.width > 480 ? "day" : "agenda",
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
							dates: this.getDates(),
							selectedDate: dates ? dates[0] : dates,
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

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		const ColoredDateCellWrapper = ({ children }) => React.cloneElement(
			React.Children.only(children),
			{
				style: {
					backgroundColor: "lightblue",
				},
			},
		);

		return (
			<div id={"CyberWeekProgramme"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Programme</h2>
					</div>

					<div className="col-md-12">
						<p>
							If you wish to contribute content (topic(s) and/or speaker(s)),
							please reach out to us at <a href="mailto:info@cybersecurityweek.lu">info@cybersecurityweek.lu</a>.
						</p>
					</div>

					<div className="col-md-12 CyberWeekProgramme-dates">
						{this.state.dates
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

					{this.state.events !== null
						&& this.state.events.pagination.total > 0
						&& this.state.dates
						&& <div className="col-md-12 row-spaced">
							<Calendar
								events={this.state.events.items.map((e) => (
									{
										title: <div dangerouslySetInnerHTML={{
											__html:
											dompurify.sanitize("<div class='event-title'><b>"
												+ e.title + "</b></div><br/>"
												+ (e.abstract ? e.abstract : "")),
										}} />,
										start: new Date(e.start_date),
										end: new Date(e.end_date),
										handle: e.handle,
										link: e.link,
									}
								))}
								step={60}
								showMultiDayTimes
								date={this.state.selectedDate}
								defaultDate={this.state.dates[0] || new Date()}
								components={{
									timeSlotWrapper: ColoredDateCellWrapper,
								}}
								localizer={localizer}
								style={{
									height: 700,
									backgroundColor: "white",
								}}
								onSelectEvent={(event) => {
									if (event.link && event.link.length > 0) {
										window.open(event.link);
									} else {
										this.props.history.push("/event/" + event.handle);
									}
								}}
								showAllEvents={true}
								defaultView={"ontouchstart" in document.documentElement ? "agenda" : "day"}
								views={["day", "agenda"]}
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
