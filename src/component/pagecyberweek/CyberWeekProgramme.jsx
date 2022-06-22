import React from "react";
import "./CyberWeekProgramme.css";
import { NotificationManager as nm } from "react-notifications";
import { Calendar } from "react-big-calendar";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class CyberWeekPresentation extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
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
					min_end_date: dateToString(new Date()),
				});

				getRequest.call(this, "public/get_public_articles?" + params, (data) => {
					this.setState({
						upcomingEvents: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	render() {
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

					<div className="col-md-12">
						<h1>Calendar</h1>
					</div>

					{this.state.events !== null
						&& this.state.upcomingEvents.pagination.total > 0
						? <div className="col-md-12 row-spaced">
							<Calendar
								events={this.state.events.map((e) => (
									{
										title: e.title,
										start: new Date(e.start_date),
										end: new Date(e.end_date),
										handle: e.handle,
										link: e.link,
									}
								))}
								step={60}
								showMultiDayTimes
								defaultDate={new Date()}
								components={{
									timeSlotWrapper: ColoredDateCellWrapper,
								}}
								localizer={localizer}
								style={{
									height: 700,
									backgroundColor: "white",
								}}
								onSelectEvent={(event) => {
									if (event.link !== undefined && event.link !== null
										&& event.link.length > 0) {
										window.open(event.link);
									} else {
										this.props.history.push("/calendar/" + event.handle);
									}
								}}
							/>
						</div>
						: <Loading
							height={200}
						/>
					}

					{this.state.events
						&& this.state.upcomingEvents.pagination.total === 0
						&& <div className="row">
							<div className="col-md-12">
								<Message
									text={"No event found"}
									height={300}
								/>
							</div>
						</div>
					}

					{!this.state.events
						&& <div className="row">
							<div className="col-md-12">
								<Loading
									height={300}
								/>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}
