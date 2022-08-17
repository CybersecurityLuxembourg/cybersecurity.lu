import React from "react";
import "./PageTOTM.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { NotificationManager as nm } from "react-notifications";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import DynamicTable from "./table/DynamicTable.jsx";
import ToolHorizontal from "./item/ToolHorizontal.jsx";
import { dictToURI } from "../utils/url.jsx";
import { getRequest } from "../utils/request.jsx";

export default class PageTOTM extends React.Component {
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
				.filter((v) => v.category === "TOOL CATEGORY")
				.filter((v) => v.name === "TOPIC OF THE MONTH");

			if (values.length > 0) {
				const params = {
					type: "TOOL",
					include_tags: "true",
					taxonomy_values: values.map((v) => v.id).join(","),
					per_page: 9,
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
			<div id="PageTOTM" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/topic">TOPIC OF THE MONTH</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Topic of the month</h1>

						{this.state.news && this.state.news.pagination.total > 0
							&& <DynamicTable
								items={this.state.news.items}
								pagination={this.state.news.pagination}
								changePage={(page) => this.getNews(page)}
								buildElement={(a) => <div className="col-md-12">
									<ToolHorizontal
										info={a}
										showImage={true}
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
