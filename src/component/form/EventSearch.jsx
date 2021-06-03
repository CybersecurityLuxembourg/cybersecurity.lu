import React from "react";
import "./EventSearch.css";
import FormLine from "./FormLine.jsx";
import getLeavesOfNode from "../../utils/taxonomy.jsx";

export default class EventSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isTaxonomyDetailOpen: false,
			valueChainOrder: ["IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"],
			showFullFilters: props.filters.taxonomy_values.length > 0,
		};
	}

	getTaxonomySelectOptions() {
		const options = [];
		const solutionCategories = this.props.analytics.taxonomy_values
			.filter((v) => v.category === "VALUE CHAIN");

		solutionCategories.sort((a, b) => this.state.valueChainOrder.indexOf(a.name)
			- this.state.valueChainOrder.indexOf(b.name));

		for (let i = 0; i < solutionCategories.length; i++) {
			options.push({
				label: solutionCategories[i].category + " - " + solutionCategories[i].name,
				value: solutionCategories[i].id,
				color: "#000000",
			});

			getLeavesOfNode(this.props.analytics, [solutionCategories[i]]).forEach((l) => {
				options.push({
					label: solutionCategories[i].name + " - " + l.name,
					value: l.id,
					color: "#AAAAAA",
				});
			});
		}

		return options;
	}

	getCategorySelectOptions() {
		const options = [];
		this.props.analytics.taxonomy_values
			.filter((v) => v.category === "ARTICLE CATEGORY")
			.forEach((l) => {
				options.push({
					label: l.name,
					value: l.id,
				});
			});

		return options;
	}

	getSelectedECSO() {
		const ids = this.props.analytics.taxonomy_values
			.filter((v) => ["VALUE CHAIN", "SERVICE GROUP"].indexOf(v.category) >= 0)
			.map((v) => v.id);

		return this.props.filters.taxonomy_values
			.filter((v) => ids.indexOf(v) >= 0);
	}

	render() {
		return (
			<div className={"EventSearch row"}>
				<div className={"col-md-12"}>
					<FormLine
						label={"Topic (at least 3 characters)"}
						value={this.props.filters.title === undefined
							? [] : this.props.filters.title}
						onChange={(v) => this.props.onChange("title", v)}
					/>
					<FormLine
						label={"Service classification"}
						type={"multiselect"}
						value={this.props.filters.taxonomy_values === undefined
							|| this.props.analytics === null
							? [] : this.getSelectedECSO()}
						options={this.props.analytics !== null
							&& this.props.analytics.taxonomy_values !== undefined
							? this.getTaxonomySelectOptions()
							: []}
						onChange={(v) => this.props.onChange("taxonomy_values", v)}
					/>
				</div>
			</div>
		);
	}
}
