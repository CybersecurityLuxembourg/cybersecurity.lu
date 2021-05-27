import React from "react";
import "./PageSearch.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import Article from "./item/Article.jsx";
import Event from "./item/Event.jsx";
import SearchField from "./form/SearchField.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.getEntities = this.getEntities.bind(this);

		this.state = {
			searchValue: getUrlParameter("r"),
			taxonomyValue: getUrlParameter("taxonomy_value"),
			entities: null,
			articles: null,
		};
	}

	componentDidMount() {
		this.getEntities();
		this.getArticles();
	}

	componentDidUpdate() {
		if (this.state.searchValue !== getUrlParameter("r")) {
			this.setState({ searchValue: getUrlParameter("r") }, () => {
				this.getEntities();
				this.getArticles();
			});
		}
	}

	getEntities() {
		if (this.state.searchValue !== null && this.state.searchValue.length > 2) {
			const filters = {
				name: this.state.searchValue,
				taxonomy_values: this.state.taxonomyValue,
			};

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
		if (this.state.searchValue !== null && this.state.searchValue.length > 2) {
			const filters = {
				title: this.state.searchValue,
				taxonomy_values: this.state.taxonomyValue,
				include_tags: "true",
				type: ["NEWS", "EVENT"],
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(filters), (data) => {
				this.setState({
					articles: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				articles: null,
			});
		}
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

				<SearchField
					value={this.state.searchValue}
				/>

				{(this.state.entities === null
					|| this.state.articles === null)
					&& this.state.searchValue !== null && this.state.searchValue.length >= 3
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				{(this.state.entities === null
					|| this.state.articles === null)
					&& this.state.searchValue !== null && this.state.searchValue.length < 3
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"The search query must contain at least 3 characters"}
								height={300}
							/>
						</div>
					</div>
				}

				{(this.state.entities === null
					|| this.state.articles === null)
					&& this.state.searchValue === null
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"Please type your search query"}
								height={300}
							/>
						</div>
					</div>
				}

				{(this.state.entities !== null
					&& this.state.articles !== null)
					&& this.state.entities.length === 0
					&& this.state.articles.length === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No item found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.length > 0
					&& <div className="row">
						{this.state.articles.filter((a) => a.type === "NEWS").length > 0
							&& <div className="col-md-12">
								<h1>{this.state.articles !== null
									? this.state.articles.filter((a) => a.type === "NEWS").length + " " : ""}news</h1>
								<SimpleTable
									numberDisplayed={3}
									elements={this.state.articles
										.filter((a) => a.type === "NEWS")
										.map((a, i) => [a, i])}
									buildElement={(a) => (
										<div className="col-md-4">
											<Article
												info={a}
											/>
										</div>
									)}
								/>
							</div>
						}

						{this.state.articles.filter((a) => a.type === "EVENT").length > 0
							&& <div className="col-md-12">
								<h1>{this.state.articles !== null
									? this.state.articles.filter((a) => a.type === "EVENT").length + " " : ""}event{this.state.articles !== null && this.state.articles.filter((a) => a.type === "EVENT").length > 1 ? "s" : ""}</h1>
								<SimpleTable
									numberDisplayed={3}
									elements={this.state.articles
										.filter((a) => a.type === "EVENT")
										.map((a, i) => [a, i])}
									buildElement={(a) => (
										<div className="col-md-4">
											<Event
												info={a}
											/>
										</div>
									)}
								/>
							</div>
						}
					</div>
				}

				{this.state.entities !== null && this.state.entities.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h1>{this.state.entities !== null ? this.state.entities.length + " " : ""}entit{this.state.entities !== null && this.state.entities.length > 1 ? "ies" : "y"}</h1>
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
			</div>
		);
	}
}
