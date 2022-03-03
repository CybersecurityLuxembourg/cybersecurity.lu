import React from "react";
import "./PageLTAC.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import ArticleHorizontal from "./item/ArticleHorizontal.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PageLTAC extends React.Component {
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
				.filter((v) => v.name === "LËTZ TALK ABOUT CYBER");

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
			<div id="PageLTAC" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/ltac">LËTZ TALK ABOUT CYBER</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Lëtz talk about cyber</h1>
					</div>

					<div className="col-md-12 row-spaced">
						Lëtz Talk About Cyber series invites key cybersecurity professionals, who
						stand out with their achievements, experiences and personal stories, to share
						their insightful journey. Hosted by Mélanie Delannoy, Communications & PR
						Advisor; Cybersec enthusiast. It is a monthly release, disseminated via the
						CYBERSECURITY Luxembourg <Link to="newsletter">Newsletter</Link>.
					</div>

					<div className="col-md-12">
						<h2>Previous talks</h2>
					</div>

					<div className="col-md-12">
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
