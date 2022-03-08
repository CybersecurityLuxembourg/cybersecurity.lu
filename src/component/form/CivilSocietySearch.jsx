import React from "react";
import "./CivilSocietySearch.css";
import FormLine from "./FormLine.jsx";

export default class CivilSocietySearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isTaxonomyDetailOpen: false,
		};
	}

	render() {
		return (
			<div className={"CivilSocietySearch row"}>
				<div className={"col-md-12"}>
					<FormLine
						label={"Entity name"}
						value={this.props.filters.name === undefined
							? [] : this.props.filters.name}
						onChange={(v) => this.props.onChange("name", v)}
					/>
				</div>

				<div className={"col-md-12"}>
					<FormLine
						label={"Industry vertical"}
						type={"multiselect"}
						value={this.props.filters.taxonomy_values === undefined || this.props.taxonomy === null
							? [] : this.props.filters.taxonomy_values}
						options={this.props.taxonomy !== null && this.props.taxonomy !== undefined
							&& this.props.taxonomy.values !== undefined
							? this.props.taxonomy.values
								.filter((v) => ["INDUSTRY VERTICAL"]
									.indexOf(v.category) >= 0)
								.map((v) => ({ label: v.category + " - " + v.name, value: v.id }))
							: []}
						onChange={(v) => this.props.onChange("taxonomy_values", v)}
						disabled={this.state.tags === null}
					/>
				</div>

				<div className={"col-md-12"}>
					<div className="right-buttons">
						<button
							className={"blue-background"}
							onClick={this.props.onSearch}
						>
							<i className="fas fa-arrow-alt-circle-right"/> Apply filters
						</button>
					</div>
				</div>
			</div>
		);
	}
}
