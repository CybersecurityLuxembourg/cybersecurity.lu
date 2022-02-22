import React from "react";
import "./PageCSB.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import EventHorizontal from "./item/EventHorizontal.jsx";
import ArticleHorizontal from "./item/ArticleHorizontal.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PageCSB extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			events: null,
		};
	}

	componentDidMount() {
		this.getNews();
		this.getEvents();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getNews();
			this.getEvents();
		}
	}

	getNews(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 5,
					page: page === undefined ? 1 : page,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						news: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					news: { pagination: { total: 0 } },
				});
			}
		}
	}

	getEvents(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "EVENT",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 5,
					page: page === undefined ? 1 : page,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						events: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					events: { pagination: { total: 0 } },
				});
			}
		}
	}

	render() {
		return (
			<div id="PageCSB" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/breakfast">CYBERSECURITY BREAKFAST</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Cybersecurity Breakfast Events</h1>

						{this.state.events && this.state.events.pagination.total > 0
							&& <DynamicTable
								items={this.state.events.items}
								pagination={this.state.events.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-12">
									<EventHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.events && this.state.events.pagination.total === 0
							&& <Message
								text={"No CSB found"}
								height={300}
							/>
						}

						{!this.state.events
							&& <Loading
								height={300}
							/>
						}
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Recap of the previous CSB</h1>

						{this.state.news && this.state.news.pagination.total > 0
							&& <DynamicTable
								items={this.state.news.items}
								pagination={this.state.news.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-12">
									<ArticleHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.news && this.state.news.pagination.total === 0
							&& <Message
								text={"No article found"}
								height={300}
							/>
						}

						{!this.state.news
							&& <Loading
								height={300}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}
