import React from "react";
import "./PageNewsletter.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import ShadowBoxSubscribeNewsletter from "./box/ShadowBoxSubscribeNewsletter.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import ArticleHorizontal from "./item/ArticleHorizontal.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PageNewsletter extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
		};
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getNews();
		}
	}

	getNews(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "NEWSLETTER");

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

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/newsletter">NEWSLETTER</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Subscribe to our newsletter</h1>

						<p>
							Keep up to date with the latest cybersecurity news in and around Luxembourg:
							from institutional news, to the tech corner and upcoming events, find a review
							of all the newest developments in one place and remain a step ahead of
							what&apos;s coming next.
						</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4"/>

					<div className="col-md-4">
						<ShadowBoxSubscribeNewsletter
							{...this.props}
						/>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<p>
							Sent every first Tuesday of the month, this monthly newsletter is a great
							opportunity to get to know the entities that make up the ecosystem.
						</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Previous newsletters</h1>

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
								text={"No newsletter found"}
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
