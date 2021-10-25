import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import ArticleHorizontal from "./item/ArticleHorizontal.jsx";
import Message from "./box/Message.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import ArticleSearch from "./form/ArticleSearch.jsx";
import DynamicTable from "./table/DynamicTable.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			articles: null,
			newsCompanies: null,
			filters: {
				type: "NEWS",
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v, 10)) : [],
				title: null,
				include_tags: "true",
				per_page: 20,
				page: getUrlParameter("page") !== null ? parseInt(getUrlParameter("page"), 10) : 1,
				member_news_only: getUrlParameter("member_news_only") === "true",
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	componentDidUpdate(_, prevState) {
		if (prevState.filters.taxonomy_values !== this.state.filters.taxonomy_values
			|| prevState.filters.member_news_only !== this.state.filters.member_news_only
			|| (prevState.filters.title !== this.state.filters.title
				&& (this.state.filters.title.length === null
					|| this.state.filters.title.length === undefined
					|| this.state.filters.title.length > 2
					|| this.state.filters.title.length === 0))) {
			this.getArticles();
		}
	}

	getArticles(page) {
		this.setState({
			articles: null,
			newsCompanies: null,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		});

		let params = {
			...this.state.filters,
			page: Number.isInteger(page) ? page : this.state.filters.page,
			is_created_by_admin: this.state.filters.member_news_only
				? false : undefined,
		};

		delete params.member_news_only;
		params = dictToURI(params);

		const urlParams = dictToURI({
			taxonomy_values: this.state.filters.taxonomy_values,
			page: Number.isInteger(page) ? page : this.state.filters.page,
			member_news_only: this.state.filters.member_news_only ? true : undefined,
		});

		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + urlParams);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
			}, () => {
				const params2 = {
					ids: Array.prototype.concat.apply(
						[],
						data.items
							.filter((i) => i.company_tags)
							.map((i) => i.company_tags),
					),
				};

				if (params2.ids.length > 0) {
					getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data2) => {
						this.setState({
							newsCompanies: data2,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				}
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		filters.page = 1;
		this.setState({ filters });
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
							<Breadcrumb.Item><Link to="/news">WHAT&apos;S UP?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<ArticleSearch
							analytics={this.props.analytics}
							filters={this.state.filters}
							onChange={this.modifyFilters}
							onSearch={this.getArticles}
						/>
					</div>
				</div>

				{this.state.articles !== null && this.state.articles.pagination
					&& this.state.articles.pagination.total === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.pagination
					&& this.state.articles.pagination.total > 0
					&& <DynamicTable
						items={this.state.articles.items}
						pagination={this.state.articles.pagination}
						changePage={(page) => this.getArticles(page)}
						buildElement={(a) => <div className="col-md-12">
							<ArticleHorizontal
								info={a}
								analytics={this.props.analytics}
								companies={this.state.newsCompanies}
							/>
						</div>
						}
					/>
				}

				{(this.state.articles === null
					|| this.state.articles.pagination === undefined
					|| this.state.articles.items === undefined)
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
