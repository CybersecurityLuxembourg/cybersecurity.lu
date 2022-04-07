import React from "react";
import "./CyberWeekProgramme.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import EventHorizontal from "../item/EventHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class CyberWeekProgramme extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: null,
		};
	}

	componentDidMount() {
		this.getCybersecurityWeekEvents();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getCybersecurityWeekEvents();
		}
	}

	getCybersecurityWeekEvents(page) {
		if (this.props.analytics) {
			const valueIds = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "PROGRAMME" && v.name === "CSWL 2022")
				.map((v) => v.id);

			if (valueIds.length > 0) {
				const params = {
					type: "EVENT",
					page: page || 1,
					per_page: 5,
					taxonomy_values: valueIds,
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
					this.setState({
						events: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					events: { pagination: { total: 0 } },
				});
			}
		}
	}

	render() {
		return (
			<div id={"CyberWeekProgramme"} className="row row-spaced">
				<div className="col-md-12">
					<h2>Events</h2>
				</div>

				<div className="col-md-12">
					{this.state.events && this.state.events.pagination.total > 0
						&& <DynamicTable
							items={this.state.events.items}
							pagination={this.state.events.pagination}
							changePage={(page) => this.getCybersecurityWeekEvents(page)}
							buildElement={(a) => <div className="col-md-12">
								<EventHorizontal
									info={a}
									analytics={this.props.analytics}
								/>
							</div>
							}
						/>
					}

					{this.state.events && this.state.events.pagination.total === 0
						&& <Message
							text={"No event found"}
							height={300}
						/>
					}

					{!this.state.events
						&& <Loading
							height={300}
						/>
					}
				</div>
			</div>
		);
	}
}
