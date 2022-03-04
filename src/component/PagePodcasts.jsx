import React from "react";
import "./PagePodcasts.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import ToolHorizontal from "./item/ToolHorizontal.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PagePodcasts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			podcasts: null,
		};
	}

	componentDidMount() {
		this.getPodcasts();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getPodcasts();
		}
	}

	getPodcasts(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "LËTZ TALK ABOUT CYBER" || v.name === "CYBERSECURITY BREAKFAST");

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
						podcasts: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					podcasts: { pagination: { total: 0 } },
				});
			}
		}
	}

	render() {
		return (
			<div id="PagePodcasts" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/podcasts">PODCASTS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Podcasts</h1>
					</div>

					<div className="col-md-12">
						CYBERSECURITY Breakfast Podcast is a monthly series that tackles trending
						or pressing cybersecurity topics. National and international experts from
						various field of activities discuss their views and experiences.
					</div>

					<div className="col-md-12">
						{this.state.podcasts && this.state.podcasts.pagination.total > 0
							&& <DynamicTable
								items={this.state.podcasts.items}
								pagination={this.state.podcasts.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-12">
									<ToolHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.podcasts && this.state.podcasts.pagination.total === 0
							&& <Message
								text={"No podcast found"}
								height={300}
							/>
						}

						{!this.state.podcasts
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
