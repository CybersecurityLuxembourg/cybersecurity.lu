import React from "react";
import "./PageNews.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import Article from "./item/Article.jsx";
import Message from "./box/Message.jsx";
import { dictToURI } from "../utils/url.jsx";
import ArticleSearch from "./form/ArticleSearch.jsx";
import SimpleTable from "./table/SimpleTable.jsx";

export default class PageNews extends React.Component {
	constructor(props) {
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			page: 1,
			articles: null,
			loading: false,
			filters: {
				media: "CYBERLUX",
				type: "NEWS",
				taxonomy_values: [],
				title: null,
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
			articles: null,
		});

		const params = dictToURI(this.state.filters);

		getRequest.call(this, "public/get_public_articles?" + params, (data) => {
			this.setState({
				articles: data,
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
							<Breadcrumb.Item><Link to="/news">NEWS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<ArticleSearch
					analytics={this.props.analytics}
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.getArticles}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Articles</h1>
					</div>
				</div>

				{this.state.articles !== null && this.state.articles.length === 0
					&& <div className="row row-spaced">
						<div className="col-md-12">
							<Message
								text={"No article found"}
								height={200}
							/>
						</div>
					</div>
				}

				{this.state.articles !== null && this.state.articles.length > 0
					&& <SimpleTable
						className={""}
						elements={this.state.articles.map((a, i) => [a, i])}
						buildElement={(a) => (
							<div className="col-md-4">
								<Article
									info={a}
								/>
							</div>
						)}
					/>
				}

				{this.state.articles === null
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
