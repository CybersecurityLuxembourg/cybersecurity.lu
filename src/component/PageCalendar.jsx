import React from "react";
import "./PageCalendar.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Event from "./item/Event.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import { dateToString } from "../utils/date.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import SearchField from "./form/SearchField.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class PageCalendar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
			upcomingEvents: null,
		};
	}

	componentDidMount() {
		this.getArticles();
		this.requestUpcomingEvents();
	}

	getArticles() {
		this.setState({
			events: null,
		});

		this.requestAllEvents(1);
	}

	requestUpcomingEvents(p) {
		const page = Number.isInteger(p) ? p : 1;

		const params = dictToURI({
			type: "EVENT",
			include_tags: "true",
			order_by: "start_date",
			order: "asc",
			min_end_date: dateToString(new Date()),
			per_page: 6,
			page,
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

	requestAllEvents(p) {
		const page = Number.isInteger(p) ? p : 1;
		const date = new Date();
		date.setFullYear(date.getFullYear() - 1);

		const params = dictToURI({
			type: "EVENT",
			include_tags: "true",
			order_by: "start_date",
			order: "asc",
			min_start_date: dateToString(date),
			page,
		});

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			const pagesToQuery = [...Array(data.pagination.pages + 1).keys()]
				.filter((i) => i > 1);

			if (pagesToQuery.length > 0) {
				this.setState({
					events: (this.state.events === null ? [] : this.state.events).concat(data.items),
				}, () => {
					if (data.pagination.page < data.pagination.pages) {
						this.requestArticles(page + 1);
					}
				});
			}

			if (pagesToQuery.length === 0 && page === 1) {
				this.setState({
					events: data.items,
				});
			}
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
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
			<div id={"PageCalendar"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/events">UPCOMING EVENTS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h4>Search over the portal</h4>
					</div>

					<div className="col-md-12 row-spaced">
						<SearchField/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Upcoming events</h1>
					</div>
				</div>

				{this.state.upcomingEvents
					&& this.state.upcomingEvents.pagination.total === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No coming event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.upcomingEvents
					&& this.state.upcomingEvents.pagination.total > 0
					&& <DynamicTable
						items={this.state.upcomingEvents.items}
						pagination={this.state.upcomingEvents.pagination}
						changePage={(page) => this.requestUpcomingEvents(page)}
						buildElement={(a) => <div className="col-md-4">
							<Event
								info={a}
								analytics={this.props.analytics}
							/>
						</div>
						}
					/>
				}

				{!this.state.upcomingEvents
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Calendar</h1>
					</div>

					{this.state.events !== null && this.state.events !== undefined
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
				</div>
			</div>
		);
	}
}
