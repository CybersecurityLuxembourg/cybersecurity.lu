import React from "react";
import "./ArticleSearch.css";
import { NotificationManager as nm } from "react-notifications";
import FormLine from "./FormLine.jsx";
import { getRequest } from "../../utils/request.jsx";

export default class ArticleSearch extends React.Component {
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
			<div className={"row"}>
				<div className={"col-md-12"}>
					<h1>Filter</h1>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						label={"Titre"}
						value={this.props.filters.title}
						onChange={(v) => this.props.onChange("title", v)}
						labelWidth={4}
					/>
				</div>

				<div className={"col-md-6"}>
					<FormLine
						label={"Tags"}
						type={"multiselect"}
						value={this.props.filters.taxonomy_values}
						options={this.state.tags !== null ? this.state.tags
							.map((v) => ({ label: v.category + " - " + v.name, value: v.id }))
							: []}
						onChange={(v) => this.props.onChange("taxonomy_values", v)}
						disabled={this.state.tags === null}
						labelWidth={4}
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
