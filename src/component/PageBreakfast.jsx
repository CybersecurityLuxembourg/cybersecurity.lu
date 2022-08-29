import React from "react";
import "./PageBreakfast.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import DynamicTable from "./table/DynamicTable.jsx";

export default class PageBreakfast extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
			newsCompanies: null,
			events: null,
			eventsCompanies: null,
		};
	}

	componentDidMount() {
		this.getArticles("news", "NEWS");
		this.getArticles("events", "EVENT");
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getArticles("news", "NEWS");
			this.getArticles("events", "EVENT");
		}
	}

	getArticles(variable, type, page) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY" && v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = dictToURI({
					type,
					page,
					taxonomy_values: values.join(","),
				});

				getRequest.call(this, "public/get_public_articles?" + params, (data) => {
					this.setState({
						[variable]: data,
					}, () => {
						let entityIds = data.items
							? data.items.map((a) => (a.entity_tags ? a.entity_tags : []))
							: [];
						entityIds = Array.prototype.concat.apply([], entityIds);
						entityIds = [...new Set(entityIds)];

						const params2 = dictToURI({
							ids: entityIds,
						});

						getRequest.call(this, "public/get_public_entities?" + params2, (data2) => {
							this.setState({
								[variable + "Companies"]: data2,
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
			} else {
				this.setState({
					[variable]: { pagination: { total: 0 } },
				});
			}
		}
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/breakfast">BREAKFAST</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<p>Some text</p>
					</div>
				</div>

				{this.state.news
					&& this.state.news.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.news
					&& this.state.news.pagination.total > 0
					&& <DynamicTable
						items={this.state.news.items}
						pagination={this.state.news.pagination}
						changePage={(page) => this.getArticles("news", "NEWS", page)}
						buildElement={(a) => <div
							className="col-md-4"
							key={a.id}>
							<Article
								info={a}
								analytics={this.props.analytics}
								companies={this.state.newsCompanies}
							/>
						</div>
						}
					/>
				}

				{!this.state.news
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<p>Some text</p>
					</div>
				</div>

				{this.state.events
					&& this.state.events.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No event found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.events
					&& this.state.events.pagination.total > 0
					&& <DynamicTable
						items={this.state.events.items}
						pagination={this.state.events.pagination}
						changePage={(page) => this.getArticles("events", "EVENT", page)}
						buildElement={(a) => <div
							className="col-md-4"
							key={a.id}>
							<Event
								info={a}
								analytics={this.props.analytics}
								companies={this.state.eventsCompanies}
							/>
						</div>
						}
					/>
				}

				{!this.state.events
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<p>Some text</p>
					</div>
				</div>
			</div>
		);
	}
}
