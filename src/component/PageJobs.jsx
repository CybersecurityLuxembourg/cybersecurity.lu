import React from "react";
import "./PageJobs.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import JobOfferHorizontal from "./item/JobOfferHorizontal.jsx";
import Message from "./box/Message.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import SearchField from "./form/SearchField.jsx";
import DynamicTable from "./table/DynamicTable.jsx";

export default class PageJobs extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			articles: null,
			filters: {
				type: "JOB OFFER",
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v, 10)) : [],
				title: null,
				include_tags: "true",
				per_page: 20,
				page: getUrlParameter("page") !== null ? parseInt(getUrlParameter("page"), 10) : 1,
			},
		};
	}

	componentDidMount() {
		this.getArticles();
	}

	getArticles(page) {
		this.setState({
			articles: null,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		});

		const params = dictToURI({
			...this.state.filters,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		});

		const urlParams = dictToURI({
			taxonomy_values: this.state.filters.taxonomy_values,
			page: Number.isInteger(page) ? page : this.state.filters.page,
		});

		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + urlParams);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
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
						entities: data2,
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
							<Breadcrumb.Item><Link to="/jobs">CYBERSECURITY JOBS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h4>Search over the portal</h4>
					</div>

					<div className="col-md-12 row-spaced">
						<SearchField/>
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
						buildElement={(a) => <div
							className="col-md-12"
							key={a.id}>
							<JobOfferHorizontal
								info={a}
								analytics={this.props.analytics}
								entities={this.state.entities}
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
