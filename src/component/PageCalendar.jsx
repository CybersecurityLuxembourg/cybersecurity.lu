import React from "react";
import "./PageCalendar.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import EventHorizontal from "./item/EventHorizontal.jsx";
import Message from "./box/Message.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import EventSearch from "./form/EventSearch.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class PageCalendar extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			articles: null,
			loading: false,
			filters: {
				media: "CYBERLUX",
				type: "EVENT",
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v, 10)) : [],
				title: null,
				include_tags: "true",
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	componentDidUpdate(_, prevState) {
		if (prevState.filters.taxonomy_values !== this.state.filters.taxonomy_values
			|| (prevState.filters.title !== this.state.filters.title
				&& (this.state.filters.title.length === null
					|| this.state.filters.title.length === undefined
					|| this.state.filters.title.length > 2
					|| this.state.filters.title.length === 0))) {
			this.getArticles();
		}
	}

	getArticles() {
		this.setState({
			loading: true,
		});

		const params = dictToURI(this.state.filters);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
				loading: false,
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
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
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/calendar">WHERE TO MEET?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<EventSearch
							analytics={this.props.analytics}
							filters={this.state.filters}
							onChange={this.modifyFilters}
							onSearch={this.getArticles}
						/>
					</div>
				</div>

				<div className="row row-spaced">
					{this.state.articles !== null && !this.state.loading
						? <div className="col-md-12">
							<Calendar
								events={this.state.articles.map((e) => (
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

				<div className="row">
					<div className="col-md-12">
						<h1>Coming events</h1>
					</div>
				</div>

				{this.state.articles !== null && !this.state.loading
					&& this.state.articles.filter((a) => new Date(a.end_date) > new Date()).length === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No coming event found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && !this.state.loading
					&& this.state.articles.filter((a) => new Date(a.end_date) > new Date()).length > 0
					&& <SimpleTable
						numberDisplayed={5}
						elements={this.state.articles
							.filter((a) => new Date(a.end_date) > new Date())
							.sort((a, b) => (a.start_date > b.start_date ? 1 : -1))
							.map((a, i) => [a, i])
						}
						buildElement={(a) => (
							<div className="col-md-12">
								<EventHorizontal
									info={a}
									analytics={this.props.analytics}
								/>
							</div>
						)}
					/>
				}

				{(this.state.articles === null || this.state.loading)
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
