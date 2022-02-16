import React from "react";
import "./BestPracticesPage.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Service from "../item/Service.jsx";
import Tool from "../item/Tool.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class BestPracticesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: null,
			tools: null,
		};
	}

	componentDidMount() {
		this.fetchServices();
		this.fetchTools();
	}

	componentDidUpdate(prevProps) {
		if ((!prevProps.taxonomyValue && this.props.taxonomyValue)
			|| (!prevProps.analytics && this.props.analytics)) {
			this.fetchServices();
			this.fetchTools();
		}
	}

	fetchServices(page) {
		if (this.props.analytics && this.props.taxonomyValue) {
			const params = {
				type: "SERVICE",
				page: page || 1,
				per_page: 9,
				taxonomy_values: this.props.taxonomyValue.id,
				include_tags: true,
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					services: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	fetchTrainings(page) {
		if (this.props.analytics && this.props.taxonomyValue) {
			const params = {
				type: "SERVICE",
				page: page || 1,
				per_page: 9,
				taxonomy_values: this.props.taxonomyValue.id,
				include_tags: true,
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					services: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	fetchTools(page) {
		if (this.props.analytics && this.props.taxonomyValue) {
			const params = {
				type: "TOOL",
				page: page || 1,
				per_page: 9,
				taxonomy_values: this.props.taxonomyValue.id,
				include_tags: true,
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					tools: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getToolCategories() {
		if (this.props.analytics && this.state.tools) {
			const categories = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "BEST PRACTICE CATEGORY");
			const categoriesIds = categories.map((v) => v.id);

			const toolTaxonomyValues = [...Array.prototype.concat.apply(
				[],
				this.state.tools.items.map((i) => i.taxonomy_tags),
			)];
			const selectedCategories = categoriesIds
				.filter((c) => toolTaxonomyValues.indexOf(c) >= 0);

			return this.props.analytics.taxonomy_values
				.filter((v) => selectedCategories.indexOf(v.id) >= 0);
		}

		return null;
	}

	getToolsFromCategory(categoryId) {
		if (this.props.analytics && this.state.tools) {
			return this.state.tools.items
				.filter((t) => t.taxonomy_tags.indexOf(categoryId) >= 0);
		}

		return null;
	}

	render() {
		return (
			<div id={"EducationTrainingAndCourses"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Tools</h2>
					</div>

					{this.getToolCategories()
						&& this.getToolCategories().map((c) => (
							<div
								key={c.id}
								className="col-md-12 row-spaced">
								<h3>{c.name}</h3>

								{this.getToolsFromCategory(c.id) && this.getToolsFromCategory(c.id).length > 0
									? <div>
										{this.getToolsFromCategory(c.id).map((t) => (
											<div className="col-md-4" key={t.id}>
												<Tool
													info={t}
													analytics={this.props.analytics}
												/>
											</div>
										))}
									</div>
									: <Message
										text={"No tool found"}
										height={100}
									/>
								}
							</div>
						))
					}

					{this.getToolCategories() && this.getToolCategories().length === 0
						&& <Message
							text={"No tool found"}
							height={300}
						/>
					}

					{!this.getToolCategories() && !this.state.tools
						&& <Loading
							height={300}
						/>
					}

					<div className="col-md-12">
						<h2>Services</h2>
					</div>

					<div className="col-md-12">
						{this.state.services && this.state.services.pagination.total > 0
							&& <DynamicTable
								items={this.state.services.items}
								pagination={this.state.services.pagination}
								changePage={(page) => this.getServices(page)}
								buildElement={(a) => <div className="col-md-4">
									<Service
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.services && this.state.services.pagination.total === 0
							&& <Message
								text={"No service found"}
								height={300}
							/>
						}

						{!this.state.services
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
