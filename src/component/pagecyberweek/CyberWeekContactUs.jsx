import React from "react";
import "./CyberWeekContactUs.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import ArticleHorizontal from "../item/ArticleHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class CyberWeekContactUs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			news: null,
		};
	}

	componentDidMount() {
		this.getCybersecurityWeekNews();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getCybersecurityWeekNews();
		}
	}

	getCybersecurityWeekNews(page) {
		if (this.props.analytics) {
			const valueIds = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "PROGRAMME" && v.name === "CSWL 2022")
				.map((v) => v.id);

			if (valueIds.length > 0) {
				const params = {
					type: "NEWS",
					page: page || 1,
					per_page: 5,
					taxonomy_values: valueIds,
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
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
			<div id={"CyberWeekContactUs"} className="row row-spaced">
				<div className="col-md-12">
					<h2>News</h2>
				</div>

				<div className="col-md-12">
					{this.state.news && this.state.news.pagination.total > 0
						&& <DynamicTable
							items={this.state.news.items}
							pagination={this.state.news.pagination}
							changePage={(page) => this.getCybersecurityWeekNews(page)}
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
							text={"No news found"}
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
		);
	}
}
