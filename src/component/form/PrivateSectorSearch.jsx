import React from "react";
import "./PrivateSectorSearch.css";
import Popup from "reactjs-popup";
import FormLine from "./FormLine.jsx";
import getLeavesOfNode from "../../utils/taxonomy.jsx";

export default class PrivateSectorSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isTaxonomyDetailOpen: false,
			valueChainOrder: ["IDENTIFY", "PROTECT", "DETECT", "RESPOND", "RECOVER"],
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

	render() {
		return (
			<div className={"PrivateSectorSearch row"}>
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
						label={"Cybersecurity as a core business only"}
						type={"checkbox"}
						value={this.props.filters.corebusiness_only}
						onChange={(v) => this.props.onChange("corebusiness_only", v)}
						background={false}
					/>
				</div>

				<div className={"col-md-12"}>
					<FormLine
						label={"Startup only"}
						type={"checkbox"}
						value={this.props.filters.startup_only}
						onChange={(v) => this.props.onChange("startup_only", v)}
						background={false}
					/>
				</div>

				<div className={"col-md-12"}>
					<FormLine
						label={"Classification"}
						type={"multiselect"}
						value={this.props.filters.taxonomy_values === undefined || this.props.analytics === null
							? [] : this.props.filters.taxonomy_values}
						options={this.props.analytics !== null
							&& this.props.analytics.taxonomy_values !== undefined
							? this.getTaxonomySelectOptions()
							: []}
						onChange={(v) => this.props.onChange("taxonomy_values", v)}
					/>
				</div>

				<div className={"col-md-6"}>
				</div>

				<div className={"col-md-6 PrivateSectorSearch-taxonomy-link-container"}>
					<Popup
						className={"Popup-full-size"}
						trigger={
							<a className={"PrivateSectorSearch-taxonomy-link"}>
								Learn more about the classification
							</a>
						}
						modal
						open={this.state.isTaxonomyDetailOpen}
					>
						{(close) => (
							<div className={"row"}>
								<div className={"col-md-12"}>
									<h2>Learn more about the classification</h2>
									<div className="top-right-buttons">
										<button
											className={"red-background"}
											onClick={close}>
											<i className="fas fa-times"/>
										</button>
									</div>
								</div>

								<div className={"col-md-12"}>
									{// eslint-disable-next-line
									}<p>Private companies are classified according to the <a target="_blank" rel="noreferrer" href="http://www.ecs-org.eu/documents/uploads/ecso-cybersecurity-market-radar-brochure.pdf">ECSO Cybersecurity Market Radar</a>, which is based on the <a target="_blank" rel="noreferrer" href="https://www.nist.gov/cyberframework">NIST Cybersecurity Framework.</a></p>
									{// eslint-disable-next-line
									}<p>The ECSO Cybersecurity Market Radar serves as a comprehensive visualisation tool of the European cybersecurity market.</p>
									{// eslint-disable-next-line
									}<p>The ECSO Radar indicates 5 capabilities that make the cybersecurity value chain:</p>
									<ul>
										<li>identify,</li>
										<li>protect,</li>
										<li>detect,</li>
										<li>respond,</li>
										<li>recover.</li>
									</ul>
									{// eslint-disable-next-line
									}<p>Each link in the value chain is then divided into groups of services and products that are respectively offered by the member companies of the ecosystem.</p>
									<img
										className="PrivateSectorSearch-img"
										src="img/cybersecurity-ecso-taxonomy.png"
									/>
								</div>
							</div>
						)}
					</Popup>
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
