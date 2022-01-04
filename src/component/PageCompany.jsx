import React from "react";
import "./PageCompany.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import NoImage from "./box/NoImage.jsx";
import { getApiURL } from "../utils/env.jsx";
import { dictToURI } from "../utils/url.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import Tab from "./tab/Tab.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import JobOffer from "./item/JobOffer.jsx";
import ServiceHorizontal from "./item/ServiceHorizontal.jsx";
import ToolHorizontal from "./item/ToolHorizontal.jsx";

export default class PageCompany extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			company: null,
			news: null,
			events: null,
			jobOffers: null,
			services: null,
			tools: null,
		};
	}

	componentDidMount() {
		this.getCompanyContent();
		this.getCompanyArticle("NEWS", "news");
		this.getCompanyArticle("EVENT", "events");
		this.getCompanyArticle("JOB OFFER", "jobOffers");
		this.getCompanyArticle("SERVICE", "services");
		this.getCompanyArticle("TOOL", "tools");
	}

	getCompanyContent() {
		getRequest.call(this, "public/get_public_company/" + this.props.match.params.id, (data) => {
			this.setState({
				company: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyArticle(type, variable, page) {
		const params = {
			type,
			companies: this.props.match.params.id,
			page: page || 1,
			per_page: 2,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				[variable]: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	hasWebsite() {
		return this.state.company
			&& this.state.company.website
			&& this.state.company.website.length > 0;
	}

	getArticleContent(type, articles, fetchFunction) {
		if (articles) {
			if (articles.pagination.total > 0) {
				return <div className="col-md-12">
					<DynamicTable
						items={articles.items}
						pagination={articles.pagination}
						changePage={(page) => fetchFunction(page)}
						buildElement={(a) => <div className="col-md-6">
							{type === "news"
								&& <Article
									info={a}
									analytics={this.props.analytics}
								/>
							}
							{type === "event"
								&& <Event
									info={a}
									analytics={this.props.analytics}
								/>
							}
							{type === "joboffer"
								&& <JobOffer
									info={a}
									analytics={this.props.analytics}
								/>
							}
						</div>
						}
					/>
				</div>;
			}

			return <div className="col-md-12">
				<Message
					text={"No item found"}
					height={200}
				/>
			</div>;
		}

		return <div className="col-md-12">
			<Loading
				height={200}
			/>
		</div>;
	}

	getTaxonomyCategories() {
		if (this.props.analytics
			&& this.state.company
			&& this.state.company.taxonomy_assignment.length > 0) {
			console.log(this.state.company.taxonomy_assignment);
			/* let values = this.state.company.taxonomy_assignment
				.filter((v) => this.state.company.taxonomy_assignment.indexOf(v) >= 0); */
			return ["ECOSYSTEM ROLE"];
		}

		return [];
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"PageCompany page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/">COMPANY</Link></Breadcrumb.Item>
							{this.state.company !== null && !this.state.loading
								? <Breadcrumb.Item>
									<Link to={"/company/" + this.state.company.id}>{this.state.company.name}</Link>
								</Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.company !== null
					? <div className="row row-spaced">
						<div className="col-md-12">
							<div className="row">
								<div className={"col-md-4 "
									+ (this.state.company.image
										&& this.state.company.image
										? "PageCompany-logo" : "PageCompany-no-logo")}>
									{this.state.company.image
										? <img
											src={getApiURL() + "public/get_public_image/" + this.state.company.image}
											alt="Card image cap"
										/>
										: <NoImage/>
									}
								</div>
								<div className="col-md-8 PageCompany-name">
									<h3>{this.state.company.name}</h3>
								</div>
							</div>

							<div className="row">
								<div className={"col-md-" + (this.hasWebsite() ? "8" : "12")}>
									<div className="row">
										<div className={"col-md-12"}>
											<h3>About</h3>
										</div>
									</div>

									<div className="row">
										<div className={"col-md-12"} style={{ whiteSpace: "pre-line" }}>
											{this.state.company.description}
										</div>
									</div>

									<div className="row">
										{this.state.company.trade_register_number
											? <div className={"col-md-12"}>
												<b>Trade register number:</b> {this.state.company.trade_register_number}
											</div>
											: ""
										}

										{this.state.company.creation_date
											? <div className={"col-md-12"}>
												<b>Creation date:</b> {this.state.company.creation_date}
											</div>
											: ""
										}
									</div>

									<div className="row">
										{this.state.company.is_cybersecurity_core_business
											&& this.state.company.is_cybersecurity_core_business
											? <div className="col-md-12 PageCompany-stamp">
												<i className="fas fa-check-circle"/> Cybersecurity as a core business
											</div>
											: ""
										}

										{this.state.company.is_startup
											? <div className="col-md-12 PageCompany-stamp">
												<i className="fas fa-check-circle"/> Start-up
											</div>
											: ""
										}
									</div>
								</div>

								{this.hasWebsite()
									? <div className="col-md-4">
										<div className="shadow-section blue-shadow-section centered-shadow-section">
											{/* eslint-disable no-script-url */}
											<a
												href={!/^(?:f|ht)tps?:\/\//.test(this.state.company.website)
													? "https://" + this.state.company.website
													: this.state.company.website}
												rel="noreferrer"
												target="_blank">
												<div>
													<h3>Visit website</h3>
													<i className="fas fa-globe-europe"/>
												</div>
											</a>
										</div>
									</div>
									: ""
								}
							</div>
						</div>
					</div>
					: <Loading
						height={400}
					/>
				}

				{this.props.analytics
					&& this.state.company
					&& this.state.company.taxonomy_assignment.length > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Taxonomy</h3>
						</div>

						{this.getTaxonomyCategories().map((c) => (
							<div
								key={c}
								className="row">
								<div className="col-md-3  shadow-section">
									<h4>{c}</h4>
								</div>
							</div>
						))}
					</div>
				}

				{this.state.news
					&& this.state.events
					&& this.state.jobOffers
					&& this.state.news.pagination.total
						+ this.state.events.pagination.total
						+ this.state.jobOffers.pagination.total > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Articles</h3>
						</div>

						<div className="col-md-12">
							<Tab
								keys={["NEWS", "EVENTS", "JOB OFFERS"]}
								labels={[
									"News (" + (this.state.news ? this.state.news.pagination.total : "?") + ")",
									"Events (" + (this.state.events ? this.state.events.pagination.total : "?") + ")",
									"Job offers (" + (this.state.jobOffers ? this.state.jobOffers.pagination.total : "?") + ")",
								]}
								content={[
									this.getArticleContent("news", this.state.news, this.getCompanyNews),
									this.getArticleContent("event", this.state.events, this.getCompanyEvents),
									this.getArticleContent("joboffer", this.state.jobOffers, this.getCompanyJobOffers),
								]}
							/>
						</div>
					</div>
				}

				{this.state.services && this.state.services.pagination.total > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>Services</h3>
						</div>

						<div className="col-md-12">
							<DynamicTable
								items={this.state.services.items}
								pagination={this.state.services.pagination}
								changePage={(page) => this.getCompanyArticle(page)}
								buildElement={(a) => <div className="col-md-12">
									<ServiceHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						</div>
					</div>
				}

				{this.state.tools && this.state.tools.pagination.total > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>Tools</h3>
						</div>

						<div className="col-md-12">
							<DynamicTable
								items={this.state.tools.items}
								pagination={this.state.tools.pagination}
								changePage={(page) => this.getCompanyArticle("TOOL", "tools", page)}
								buildElement={(a) => <div className="col-md-12">
									<ToolHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
