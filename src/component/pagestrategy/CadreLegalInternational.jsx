import React from "react";
import "./CadreLegalInternational.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ToolHorizontal from "../item/ToolHorizontal.jsx";

export default class CadreLegalInternational extends React.Component {
	constructor(props) {
		super(props);

		this.getInternationalFrameworks = this.getInternationalFrameworks.bind(this);
		this.getEuropeanFrameworkTaxonomyValues = this.getEuropeanFrameworkTaxonomyValues.bind(this);
		this.getEuropeanFrameworks = this.getEuropeanFrameworks.bind(this);
		this.getEuropeanFrameworksByTaxonomyValue = this.getEuropeanFrameworksByTaxonomyValue
			.bind(this);

		this.state = {
			internationalFrameworks: null,
			europeanFrameworks: null,
		};
	}

	componentDidMount() {
		this.getInternationalFrameworks();
		this.getEuropeanFrameworks();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getInternationalFrameworks();
			this.getEuropeanFrameworks();
		}
	}

	getInternationalFrameworks() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				internationalFrameworks: null,
			});

			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& v.name === "INTERNATIONAL FRAMEWORK")
				.map((v) => v.id);

			if (taxonomyValues.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: taxonomyValues,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						internationalFrameworks: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getEuropeanFrameworkTaxonomyValues() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& v.name.startsWith("EUROPEAN FRAMEWORK"));
		}

		return [];
	}

	getEuropeanFrameworks() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				europeanFrameworks: null,
			});

			const taxonomyValues = this.getEuropeanFrameworkTaxonomyValues();

			if (taxonomyValues.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: taxonomyValues.map((v) => v.id).join(","),
					include_tags: true,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						europeanFrameworks: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getEuropeanFrameworksByTaxonomyValue(valueId) {
		if (this.state.europeanFrameworks !== null) {
			return this.state.europeanFrameworks.items
				.filter((f) => f.taxonomy_tags.indexOf(valueId) >= 0);
		}

		return [];
	}

	render() {
		return (
			<div className={"CadreLegalInternational page max-sized-page"}>
				<h1>International framework</h1>

				{this.getEuropeanFrameworkTaxonomyValues().map((v) => <div
					key={v.name}>
					<h2>
						{v.name}
					</h2>

					{this.state.europeanFrameworks !== null
						&& this.getEuropeanFrameworksByTaxonomyValue(v.id).length === 0
						&& <Message
							text={"No object found"}
							height={200}
						/>
					}

					{this.state.europeanFrameworks !== null
						&& this.getEuropeanFrameworksByTaxonomyValue(v.id).length > 0
						&& this.getEuropeanFrameworksByTaxonomyValue(v.id).map((f) => <ToolHorizontal
							key={f.id}
							info={f}
						/>)
					}

					{this.state.europeanFrameworks === null
						&& <div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					}
				</div>)}

				<h2>INTERNATIONAL FRAMEWORK</h2>

				{this.state.internationalFrameworks !== null
					&& this.state.internationalFrameworks.items.length === 0
					&& <div className="col-md-12">
						<Message
							text={"No object found"}
							height={200}
						/>
					</div>
				}

				{this.state.internationalFrameworks !== null
					&& this.state.internationalFrameworks.items.length > 0
					&& this.state.internationalFrameworks.items.map((f) => (
						<ToolHorizontal
							key={f.id}
							info={f}
						/>
					))
				}

				{this.state.internationalFrameworks === null
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
