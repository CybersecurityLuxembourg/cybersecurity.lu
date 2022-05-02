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
			ltacPodcasts: null,
			breakfastPodcasts: null,
		};
	}

	componentDidMount() {
		this.getLTACPodcasts();
		this.getBreakfastPodcasts();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getLTACPodcasts();
			this.getBreakfastPodcasts();
		}
	}

	getLTACPodcasts(page) {
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
					per_page: 3,
					page: page === undefined ? 1 : page,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						ltacPodcasts: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					ltacPodcasts: { pagination: { total: 0 } },
				});
			}
		}
	}

	getBreakfastPodcasts(page) {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === "CYBERSECURITY BREAKFAST");

			if (values.length > 0) {
				const params = {
					type: "NEWS",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 3,
					page: page === undefined ? 1 : page,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						breakfastPodcasts: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					breakfastPodcasts: { pagination: { total: 0 } },
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
						<h2>Lëtz Talk About Cyber</h2>
					</div>

					<div className="col-md-12 row-spaced">
						Lëtz Talk About Cyber series invites key cybersecurity professionals, who
						stand out with their achievements, experiences and personal stories, to share
						their insightful journey. Hosted by Mélanie Delannoy, Communications & PR
						Advisor; Cybersec enthusiast. It is a monthly release, disseminated via the
						CYBERSECURITY Luxembourg <Link to="newsletter">Newsletter</Link>.
					</div>

					<div className="col-md-12">
						{this.state.ltacPodcasts && this.state.ltacPodcasts.pagination.total > 0
							&& <DynamicTable
								items={this.state.ltacPodcasts.items}
								pagination={this.state.ltacPodcasts.pagination}
								changePage={(page) => this.getLTACPodcasts(page)}
								buildElement={(a) => <div className="col-md-12">
									<ToolHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.ltacPodcasts && this.state.ltacPodcasts.pagination.total === 0
							&& <Message
								text={"No podcast found"}
								height={300}
							/>
						}

						{!this.state.ltacPodcasts
							&& <Loading
								height={300}
							/>
						}
					</div>

					<div className="col-md-12">
						<h2>CYBERSECURITY Breakfast</h2>
					</div>

					<div className="col-md-12">
						CYBERSECURITY Breakfast Podcast is a monthly series that tackles trending
						or pressing cybersecurity topics. National and international experts from
						various field of activities discuss their views and experiences.
					</div>

					<div className="col-md-12">
						{this.state.breakfastPodcasts && this.state.breakfastPodcasts.pagination.total > 0
							&& <DynamicTable
								items={this.state.breakfastPodcasts.items}
								pagination={this.state.breakfastPodcasts.pagination}
								changePage={(page) => this.getBreakfastPodcasts(page)}
								buildElement={(a) => <div className="col-md-12">
									<ToolHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.breakfastPodcasts && this.state.breakfastPodcasts.pagination.total === 0
							&& <Message
								text={"No podcast found"}
								height={300}
							/>
						}

						{!this.state.breakfastPodcasts
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
