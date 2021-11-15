import React from "react";
import "./PageSearch.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import Chip from "./form/Chip.jsx";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import ArticleHorizontal from "./item/ArticleHorizontal.jsx";
import EventHorizontal from "./item/EventHorizontal.jsx";
import ToolHorizontal from "./item/ToolHorizontal.jsx";
import JobOfferHorizontal from "./item/JobOfferHorizontal.jsx";
import ServiceHorizontal from "./item/ServiceHorizontal.jsx";
import SearchField from "./form/SearchField.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.getEntities = this.getEntities.bind(this);
		this.getArticles = this.getArticles.bind(this);
		this.getArticlesByType = this.getArticlesByType.bind(this);
		this.hasLoaded = this.hasLoaded.bind(this);

		this.state = {
			articleTypes: ["NEWS", "EVENT", "TOOL", "JOB OFFER", "SERVICE"],
			searchValue: getUrlParameter("r") ? decodeURI(getUrlParameter("r")) : null,
			taxonomyValue: getUrlParameter("taxonomy_value") ? getUrlParameter("taxonomy_value") : null,
			entities: null,
		};
	}

	componentDidMount() {
		this.getEntities();
		this.getArticles();
	}

	componentDidUpdate(_, prevState) {
		if (decodeURI(this.state.searchValue) !== decodeURI(getUrlParameter("r"))) {
			this.setState({
				searchValue: getUrlParameter("r") === null ? null : decodeURI(getUrlParameter("r")),
			}, () => {
				this.getEntities();
				this.getArticles();
			});
		}

		if (this.state.taxonomyValue !== prevState.taxonomyValue) {
			if (this.state.taxonomyValue === null) {
				this.props.history.push("/search");
				this.getEntities();
				this.getArticles();
			} else {
				this.props.history.push("/search?taxonomy_value=" + this.state.taxonomyValue);
			}
		}

		if (decodeURI(this.state.taxonomyValue) !== decodeURI(getUrlParameter("taxonomy_value"))) {
			this.setState({
				taxonomyValue: getUrlParameter("taxonomy_value") === null
					? null : decodeURI(getUrlParameter("taxonomy_value")),
			}, () => {
				this.getEntities();
				this.getArticles();
			});
		}
	}

	getEntities() {
		if ((this.state.searchValue && this.state.searchValue.length > 2)
			|| this.state.taxonomyValue) {
			const filters = this.state.taxonomyValue === null
				? { name: this.state.searchValue }
				: { taxonomy_values: this.state.taxonomyValue };

			getRequest.call(this, "public/get_public_companies?"
				+ dictToURI(filters), (data) => {
				this.setState({
					entities: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				entities: null,
			});
		}
	}

	getArticles() {
		for (let i = 0; i < this.state.articleTypes.length; i++) {
			this.getArticlesByType(this.state.articleTypes[i]);
		}
	}

	getArticlesByType(type, page) {
		if ((this.state.searchValue && this.state.searchValue.length > 2)
			|| this.state.taxonomyValue) {
			const filters = this.state.taxonomyValue === null
				? {
					title: this.state.searchValue,
					include_tags: "true",
					type,
					page,
					per_page: 3,
				}
				: {
					taxonomy_values: this.state.taxonomyValue,
					include_tags: "true",
					type,
					page,
					per_page: 3,
				};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(filters), (data) => {
				this.setState({
					[type.replace(" ", "_")]: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				[type.replace(" ", "_")]: null,
			});
		}
	}

	getTaxonomyValues() {
		if (this.props.analytics
			&& this.state.searchValue
			&& this.state.searchValue.length > 2) {
			const words = this.state.searchValue.toLowerCase().split(" ");
			const values = [];

			for (let i = 0; i < this.props.analytics.taxonomy_values.length; i++) {
				const name = this.props.analytics.taxonomy_values[i].name.toLowerCase();
				for (let y = 0; y < words.length; y++) {
					const appearingWords = words.filter((w) => name.includes(w));

					if (words.length === appearingWords.length) {
						values.push(this.props.analytics.taxonomy_values[i]);
					}
				}
			}

			return values;
		}

		return null;
	}

	getTaxonomyValueChip(id) {
		if (this.props.analytics !== null) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.id === parseInt(id, 10));

			if (values.length > 0) {
				return <Chip
					key={values[0].id}
					label={values[0].name}
					url={"/search?taxonomy_value=" + id}
					onClick={() => {
						this.setState({ taxonomyValue: null });
						this.props.history.push("/search");
					}}
				/>;
			}
		}

		return <Chip
			key={"Loading..."}
			label={"Loading..."}
			url={"/search?taxonomy_value=" + id}
			onClick={() => {
				this.setState({ taxonomyValue: null });
				this.props.history.push("/search");
			}}
		/>;
	}

	hasLoaded() {
		return this.state.entities !== null
			&& this.state.NEWS !== null
			&& this.state.EVENT !== null
			&& this.state.TOOL !== null
			&& this.state.JOB_OFFER !== null
			&& this.state.SERVICE !== null;
	}

	render() {
		return (
			<div className={"PageSearch page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/search">SEARCH</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				{this.state.taxonomyValue === null
					? <div className="row row-spaced">
						<div className="col-md-12">
							<SearchField
								value={this.state.searchValue}
							/>
						</div>
					</div>
					: <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Selected tag</h3>
						</div>
						<div className="col-md-12">
							{this.getTaxonomyValueChip(this.state.taxonomyValue)}
						</div>
					</div>
				}

				{this.state.taxonomyValue === null
					&& this.getTaxonomyValues() !== null
					&& this.getTaxonomyValues().length > 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<h3>Suggested tags</h3>
						</div>
						<div className="col-md-12">
							{this.getTaxonomyValues().map((v) => <Chip
								key={v.name}
								label={v.name}
								url={"/search?taxonomy_value=" + v.id}
							/>)}
						</div>
					</div>
				}

				{!this.hasLoaded()
					&& this.state.searchValue !== null && this.state.searchValue.length >= 3
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.searchValue && this.state.searchValue.length < 3
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"The search query must contain at least 3 characters"}
								height={300}
							/>
						</div>
					</div>
				}

				{!this.state.searchValue
					&& !this.state.taxonomyValue
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"Please type your search query"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities && this.state.entities.length === 0
					&& this.state.NEWS && this.state.NEWS.items.length === 0
					&& this.state.EVENT && this.state.EVENT.items.length === 0
					&& this.state.TOOL && this.state.TOOL.items.length === 0
					&& this.state.JOB_OFFER && this.state.JOB_OFFER.items.length === 0
					&& this.state.SERVICE && this.state.SERVICE.items.length === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No item found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities && this.state.entities.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.entities.length + " "}entit{this.state.entities.length > 1 ? "ies" : "y"}</h3>
						</div>
						<div className="col-md-12">
							<SimpleTable
								numberDisplayed={6}
								elements={this.state.entities.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-6">
										<Company
											info={a}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}

				{this.state.NEWS && this.state.NEWS.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.NEWS !== null
								? this.state.NEWS.pagination.total + " " : ""}news</h3>
							<DynamicTable
								items={this.state.NEWS.items}
								pagination={this.state.NEWS.pagination}
								changePage={(page) => this.getArticlesByType("NEWS", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<ArticleHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}

				{this.state.EVENT && this.state.EVENT.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.EVENT !== null
								? this.state.EVENT.pagination.total + " " : ""}event{this.state.EVENT.pagination.total > 1 ? "s" : ""}</h3>
							<DynamicTable
								items={this.state.EVENT.items}
								pagination={this.state.EVENT.pagination}
								changePage={(page) => this.getArticlesByType("EVENT", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<EventHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}

				{this.state.SERVICE && this.state.SERVICE.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.SERVICE.pagination.total + " "}service{this.state.SERVICE.pagination.total > 1 ? "s" : ""}</h3>
							<DynamicTable
								items={this.state.SERVICE.items}
								pagination={this.state.SERVICE.pagination}
								changePage={(page) => this.getArticlesByType("SERVICE", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<ServiceHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}

				{this.state.TOOL && this.state.TOOL.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.TOOL !== null
								? this.state.TOOL.pagination.total + " " : ""}tool{this.state.TOOL.pagination.total > 1 ? "s" : ""}</h3>
							<DynamicTable
								items={this.state.TOOL.items}
								pagination={this.state.TOOL.pagination}
								changePage={(page) => this.getArticlesByType("TOOL", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<ToolHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}

				{this.state.JOB_OFFER && this.state.JOB_OFFER.items.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h3>{this.state.JOB_OFFER.pagination.total + " "}job offer{this.state.JOB_OFFER.pagination.total > 1 ? "s" : ""}</h3>
							<DynamicTable
								items={this.state.JOB_OFFER.items}
								pagination={this.state.JOB_OFFER.pagination}
								changePage={(page) => this.getArticlesByType("JOB OFFER", page)}
								buildElement={(a) => (
									<div className="col-md-12">
										<JobOfferHorizontal
											info={a}
											analytics={this.props.analytics}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
