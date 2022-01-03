import React from "react";
import "./PageCompany.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import TreeTaxonomy from "./chart/TreeTaxonomy.jsx";
import NoImage from "./box/NoImage.jsx";
import { getApiURL } from "../utils/env.jsx";
import { dictToURI } from "../utils/url.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import Tab from "./tab/Tab.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import JobOffer from "./item/JobOffer.jsx";
import ServiceHorizontal from "./item/ServiceHorizontal.jsx";

export default class PageCompany extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanyContent = this.getCompanyContent.bind(this);
		this.getCompanyNews = this.getCompanyNews.bind(this);
		this.getCompanyEvents = this.getCompanyEvents.bind(this);
		this.getCompanyJobOffers = this.getCompanyJobOffers.bind(this);
		this.getCompanyServices = this.getCompanyServices.bind(this);
		this.getIndustryVertical = this.getIndustryVertical.bind(this);

		this.state = {
			company: null,
			news: null,
			events: null,
			jobOffers: null,
			services: null,
		};
	}

	componentDidMount() {
		this.getCompanyContent();
		this.getCompanyNews();
		this.getCompanyEvents();
		this.getCompanyJobOffers();
		this.getCompanyServices();
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

	getCompanyNews(page) {
		const params = {
			type: "NEWS",
			companies: this.props.match.params.id,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				news: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyEvents(page) {
		const params = {
			type: "EVENT",
			companies: this.props.match.params.id,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				events: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyJobOffers(page) {
		const params = {
			type: "JOB OFFER",
			companies: this.props.match.params.id,
			page: page || 1,
			per_page: 3,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				jobOffers: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanyServices(page) {
		const params = {
			type: "SERVICE",
			companies: this.props.match.params.id,
			page: page || 1,
			per_page: 3,
			include_tags: true,
		};

		getRequest.call(this, "public/get_public_articles?"
			+ dictToURI(params), (data) => {
			this.setState({
				services: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getIndustryVertical() {
		if (this.props.taxonomy === null
			|| this.props.taxonomy.values === undefined
			|| this.state.company === null
			|| this.state.company.taxonomy_assignment === undefined) {
			return [];
		}

		return this.props.taxonomy.values
			.filter((v) => v.category === "INDUSTRY VERTICAL")
			.filter((v) => this.state.company.taxonomy_assignment.indexOf(v.id) >= 0);
	}

	getEntityType() {
		if (this.props.taxonomy === null
			|| this.props.taxonomy.values === undefined
			|| this.state.company === null
			|| this.state.company.taxonomy_assignment === undefined) {
			return [];
		}

		return this.props.taxonomy.values
			.filter((v) => v.category === "ENTITY TYPE")
			.filter((v) => this.state.company.taxonomy_assignment.indexOf(v.id) >= 0);
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
								<div className={"col-md-3 "
									+ (this.state.company.image !== null
										&& this.state.company.image !== undefined
										? "PageCompany-logo" : "PageCompany-no-logo")}>
									{this.state.company.image !== null && this.state.company.image !== undefined
										? <img
											src={getApiURL() + "public/get_public_image/" + this.state.company.image}
											alt="Card image cap"
										/>
										: <NoImage/>
									}
								</div>
								<div className="col-md-9">
									<h3>{this.state.company.name}</h3>
								</div>
							</div>

							<div className="row">
								<div
									className="col-md-12"
									style={{ whiteSpace: "pre-line" }}>
									{this.state.company.description}
								</div>
							</div>

							<div className="row">
								{this.state.company.website !== undefined
									&& this.state.company.website !== null
									? <div className="col-md-12 right-buttons">
										<button
											className={"blue-background"}
											onClick={() => window.open(!/^(?:f|ht)tps?:\/\//.test(this.state.company.website)
												? "https://" + this.state.company.website
												: this.state.company.website,
											"_blank")}
										>
											<i className="fas fa-globe-europe"/> Visit website
										</button>
									</div>
									: ""
								}
							</div>

							<div className="row">
								{this.getIndustryVertical().map((v) => <div
									key={v.id}
									className="col-md-12 PageCompany-stamp">
									<i className="fas fa-briefcase"/> {v.name}
								</div>)
								}

								{this.state.company.is_cybersecurity_core_business !== undefined
									&& this.state.company.is_cybersecurity_core_business
									? <div className="col-md-12 PageCompany-stamp">
										<i className="fas fa-check-circle"/> Cybersecurity as a core business
									</div>
									: ""
								}

								{this.state.company.is_startup !== undefined
									&& this.state.company.is_startup
									? <div className="col-md-12 PageCompany-stamp">
										<i className="fas fa-check-circle"/> Start-up
									</div>
									: ""
								}
							</div>

							<div className="row">
								{this.state.company.rscl_number !== undefined
									&& this.state.company.rscl_number !== null
									? <div className="col-md-12">
										<b>Business register number:</b> {this.state.company.rscl_number}
									</div>
									: ""
								}

								{this.state.company.creation_date !== undefined
									&& this.state.company.creation_date !== null
									? <div className="col-md-12">
										<b>Creation date:</b> {this.state.company.creation_date}
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

				{this.state.services && this.state.services.pagination.total > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Services</h3>
						</div>

						<div className="col-md-12">
							<DynamicTable
								items={this.state.services.items}
								pagination={this.state.services.pagination}
								changePage={(page) => this.getCompanyServices(page)}
								buildElement={(a) => <div className="col-md-12">
									<ServiceHorizontal
										info={a}
										taxonomy={this.props.taxonomy}
									/>
								</div>
								}
							/>
						</div>
					</div>
				}

				{!this.state.services
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={400}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<h3>Articles</h3>
					</div>

					<div className="col-md-12">
						<Tab
							keys={["NEWS", "EVENTS", "JOB OFFERS"]}
							labels={[
								`News (${ this.state.news ? this.state.news.pagination.total : "?" })`,
								`Events (${ this.state.events ? this.state.events.pagination.total : "?" })`,
								`Job offers (${ this.state.jobOffers ? this.state.jobOffers.pagination.total : "?" })`,
							]}
							content={[
								this.state.news !== null
									? <div className="col-md-12">
										<DynamicTable
											items={this.state.news.items}
											pagination={this.state.news.pagination}
											changePage={(page) => this.getCompanyNews(page)}
											buildElement={(a) => <div className="col-md-4">
												<Article
													info={a}
													analytics={this.props.analytics}
												/>
											</div>
											}
										/>
									</div>
									: <Loading
										height={150}
									/>,
								this.state.events !== null
									? <div className="col-md-12">
										<DynamicTable
											items={this.state.events.items}
											pagination={this.state.events.pagination}
											changePage={(page) => this.getCompanyEvents(page)}
											buildElement={(a) => <div className="col-md-4">
												<Event
													info={a}
													analytics={this.props.analytics}
												/>
											</div>
											}
										/>
									</div>
									: <Loading
										height={150}
									/>,
								this.state.jobOffers !== null
									? <div className="col-md-12">
										<DynamicTable
											items={this.state.jobOffers.items}
											pagination={this.state.jobOffers.pagination}
											changePage={(page) => this.getCompanyJobOffers(page)}
											buildElement={(a) => <div className="col-md-12">
												<JobOffer
													info={a}
													analytics={this.props.analytics}
												/>
											</div>
											}
										/>
									</div>
									: <Loading
										height={150}
									/>,
							]}
						/>
					</div>
				</div>

				{this.state.company !== null
					&& this.props.taxonomy !== null
					&& this.props.taxonomy.values !== undefined
					&& this.getEntityType().filter((t) => t.name === "PRIVATE SECTOR").length > 0
					? <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Classification within the private actors of the ecosystem</h3>
						</div>
						<div className="col-md-12">
							<TreeTaxonomy
								companyAssignment={this.state.company.taxonomy_assignment}
								taxonomy={this.props.taxonomy}
								category={"SERVICE GROUP"}
							/>
						</div>
					</div>
					: ""
				}

				{this.state.company !== null
					&& this.props.taxonomy !== null
					&& this.props.taxonomy.values !== undefined
					&& this.getEntityType().filter((t) => t.name === "PUBLIC SECTOR").length > 0
					? <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Classification within the public actors of the ecosystem</h3>
						</div>
						<div className="col-md-12">
							<TreeTaxonomy
								companyAssignment={this.state.company.taxonomy_assignment}
								taxonomy={this.props.taxonomy}
								category={"LEGAL FRAMEWORK"}
							/>
						</div>
					</div>
					: ""
				}
			</div>
		);
	}
}
