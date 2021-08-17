import React from "react";
import "./CadreLegalInternational.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ToolHorizontal from "../item/ToolHorizontal.jsx";
import FormLine from "../form/FormLine.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class CadreLegalInternational extends React.Component {
	constructor(props) {
		super(props);

		this.getFrameworks = this.getFrameworks.bind(this);
		this.getFrameworkTaxonomyValues = this.getFrameworkTaxonomyValues.bind(this);
		this.changeState = this.changeState.bind(this);

		this.state = {
			frameworks: null,
			selectedTaxonomyValue: null,
		};
	}

	componentDidMount() {
		if (this.props.analytics !== null) {
			this.setState({ selectedTaxonomyValue: this.getFrameworkTaxonomyValues()[0].id });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.setState({ selectedTaxonomyValue: this.getFrameworkTaxonomyValues()[0].id });
		}

		if (prevState.selectedTaxonomyValue !== this.state.selectedTaxonomyValue) {
			this.getFrameworks();
		}
	}

	getFrameworks(page) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined
			&& this.state.selectedTaxonomyValue !== null) {
			this.setState({
				frameworks: null,
			});

			const params = {
				type: "TOOL",
				taxonomy_values: this.state.selectedTaxonomyValue,
				page: page === undefined ? 1 : page,
				include_tags: "true",
			};

			getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
				this.setState({
					frameworks: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		}
	}

	getFrameworkTaxonomyValues() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& (v.name.startsWith("EUROPEAN FRAMEWORK")
						|| v.name === "INTERNATIONAL FRAMEWORK"));
		}

		return [];
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"CadreLegalInternational page max-sized-page"}>
				<h1>International framework</h1>

				<FormLine
					label={"Framework type"}
					type={"select"}
					value={this.state.selectedTaxonomyValue}
					options={this.props.analytics !== null
						&& this.props.analytics.taxonomy_values !== undefined
						? this.getFrameworkTaxonomyValues().map((o) => ({ label: o.name, value: o.id }))
						: []}
					onChange={(v) => this.changeState("selectedTaxonomyValue", v)}
				/>

				{this.state.frameworks !== null
					&& this.state.frameworks.items.length === 0
					&& <div className="col-md-12">
						<Message
							text={"No object found"}
							height={200}
						/>
					</div>
				}

				{this.state.frameworks !== null
					&& this.state.frameworks.items.length > 0
					&& <DynamicTable
						items={this.state.frameworks.items}
						pagination={this.state.frameworks.pagination}
						changePage={(page) => this.getFrameworks(page)}
						buildElement={(t) => <div className="col-md-12">
							<ToolHorizontal
								info={t}
								analytics={this.props.analytics}
							/>
						</div>}
					/>
				}

				{this.state.frameworks === null
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
