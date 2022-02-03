import React from "react";
import "./Cyber4GrowthServices.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ServiceHorizontal from "../item/ServiceHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class Cyber4GrowthServices extends React.Component {
	constructor(props) {
		super(props);

		this.getFrameworks = this.getFrameworks.bind(this);

		this.state = {
			objects: null,
			companies: null,
		};
	}

	componentDidMount() {
		this.getFrameworks();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getFrameworks();
		}
	}

	getFrameworks(page) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				objects: null,
				companies: null,
			});

			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "SERVICE CATEGORY")
				.filter((v) => v.name.includes("CYBER4GROWTH"))
				.map((v) => v.id);

			if (taxonomyValues.length > 0) {
				const params = {
					type: "SERVICE",
					taxonomy_values: taxonomyValues,
					page: page === undefined ? 1 : page,
					per_page: 10,
					include_tags: "true",
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						objects: data,
					}, () => {
						const params2 = {
							ids: [
								Array.prototype.concat.apply(
									[],
									data.items
										.filter((i) => i.company_tags)
										.map((i) => i.company_tags),
								),
							],
						};

						getRequest.call(this, "public/get_public_companies?" + dictToURI(params2), (data2) => {
							this.setState({
								companies: data2,
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
			} else {
				this.setState({
					objects: { pagination: { total: 0 } },
				});
			}
		}
	}

	render() {
		return (
			<div id={"Cyber4GrowthServices"} className={"page max-sized-page"}>
				<h2>Services from the program</h2>

				{this.state.objects && this.state.objects.pagination.total === 0
					&& <div className="col-md-12">
						<Message
							text={"No object found"}
							height={200}
						/>
					</div>
				}

				{this.state.objects && this.state.objects.pagination.total > 0
					&& <DynamicTable
						items={this.state.objects.items}
						pagination={this.state.objects.pagination}
						changePage={(page) => this.getFrameworks(page)}
						buildElement={(t) => <div className="col-md-12">
							<ServiceHorizontal
								info={t}
								companies={this.state.companies}
								analytics={this.props.analytics}
							/>
						</div>
						}
					/>
				}

				{!this.state.objects
					&& <div className="col-md-12">
						<Loading
							height={200}
						/>
					</div>
				}

				<p>&nbsp;</p>
			</div>
		);
	}
}
