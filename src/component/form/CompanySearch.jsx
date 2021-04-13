import React from "react";
import "./CompanySearch.css";
import { NotificationManager as nm } from "react-notifications";
import FormLine from "./FormLine.jsx";
import { getRequest } from "../../utils/request.jsx";

export default class CompanySearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: null,
		};
	}

	componentDidMount() {
		this.getTags();
	}

	getTags() {
		getRequest.call(this, "public/get_public_taxonomy_values", (data) => {
			this.setState({
				tags: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div className={"CompanySearch row"}>
				<div className={"col-md-12"}>
					<h1>Filter</h1>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						label={"Company name"}
						value={this.props.filters.name === undefined
							? [] : this.props.filters.name}
						onChange={(v) => this.props.onChange("name", v)}
						labelWidth={4}
					/>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						type={"checkbox"}
						label={"Startup only"}
						value={this.props.filters.startup_only !== undefined && this.props.filters.startup_only}
						onChange={(v) => this.props.onChange("startup_only", v)}
						labelWidth={8}
					/>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						label={"Tags"}
						type={"multiselect"}
						value={this.props.filters.taxonomy_values === undefined || this.state.tags === null
							? [] : this.props.filters.taxonomy_values}
						options={this.state.tags !== null ? this.state.tags
							.map((v) => ({ label: v.category + " - " + v.name, value: v.id }))
							: []}
						onChange={(v) => this.props.onChange("taxonomy_values", v)}
						disabled={this.state.tags === null}
						labelWidth={4}
					/>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						type={"checkbox"}
						label={"Cybersecurity core business only"}
						value={this.props.filters.corebusiness_only !== undefined
								&& this.props.filters.corebusiness_only}
						onChange={(v) => this.props.onChange("corebusiness_only", v)}
						labelWidth={8}
					/>
				</div>

				<div className={"col-md-12"}>
					<div className={"right-buttons"}>
						<button
							className={"blue-background"}
							onClick={this.props.onSearch !== undefined ? this.props.onSearch : null}
						>
							<i className="fas fa-search"/> Filter
						</button>
					</div>
				</div>
			</div>
		);
	}
}
