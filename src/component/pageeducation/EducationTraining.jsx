import React from "react";
import "./EducationTraining.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import ServiceHorizontal from "../item/ServiceHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import FormLine from "../form/FormLine.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class EducationTraining extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entity: null,
			educationServices: null,
			searchValue: "",
		};
	}

	componentDidMount() {
		this.getINFPC();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getINFPC();
		}
	}

	getINFPC() {
		getRequest.call(this, "public/get_public_entities?name=INFPC", (data) => {
			if (data.length === 0) {
				nm.warning("INFPC entity not found");
			} else if (data.length > 1) {
				nm.warning("Too much entities found for INFPC");
			} else {
				this.setState({
					entity: data[0],
				}, () => {
					this.getEducationServices();
				});
			}
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getEducationServices(page) {
		if (this.props.analytics) {
			const valueIds = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "SERVICE CATEGORY" && v.name === "TRAINING")
				.map((v) => v.id);

			if (valueIds.length > 0) {
				const params = {
					type: "SERVICE",
					title: this.state.searchValue,
					page: page || 1,
					per_page: 5,
					taxonomy_values: valueIds,
					entities: [this.state.entity.id],
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?"
					+ dictToURI(params), (data) => {
					this.setState({
						educationServices: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					educationServices: { pagination: { total: 0 } },
				});
			}
		}
	}

	onSearch() {
		this.getEducationServices();
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"EducationTraining"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-6 row-spaced">
						<div className="EducationTraining-phrase centered middled">
							<h3>
								In collaboration with the national portal <a
									href="https://www.lifelong-learning.lu/"
									target="_blank"
									rel="noreferrer">lifelong-learning.lu</a>
							</h3>
						</div>
					</div>

					<div className="col-md-6 row-spaced centered">
						<a
							href="https://www.lifelong-learning.lu/"
							target="_blank"
							rel="noreferrer">
							<img
								className="EducationTraining-image"
								src={"img/logo_lifelong-learning.png"}
								alt={"Lifelong Learning"}
							/>
						</a>
					</div>

					<div className={"col-md-12"}>
						<FormLine
							label={"Training name"}
							labelWidth={3}
							value={this.props.searchValue}
							onChange={(v) => this.changeState("searchValue", v)}
						/>
					</div>

					<div className={"col-md-12 row-spaced"}>
						<div className="right-buttons">
							<button
								className={"blue-background"}
								onClick={() => this.onSearch()}
							>
								<i className="fas fa-arrow-alt-circle-right"/> Apply filters
							</button>
						</div>
					</div>

					<div className="col-md-12">
						{this.state.educationServices && this.state.educationServices.pagination.total > 0
							&& <DynamicTable
								items={this.state.educationServices.items}
								pagination={this.state.educationServices.pagination}
								changePage={(page) => this.getEducationServices(page)}
								buildElement={(a) => <div className="col-md-12">
									<ServiceHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.educationServices && this.state.educationServices.pagination.total === 0
							&& <Message
								text={"No service found"}
								height={300}
							/>
						}

						{!this.state.educationServices
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
