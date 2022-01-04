import React, { Component } from "react";
import "./JobOfferHorizontal.css";
import { Link } from "react-router-dom";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class JobOfferHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTagsContent = this.getTagsContent.bind(this);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="JobOfferHorizontal card">
				<div className="card-horizontal">
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						{this.getTagsContent()}

						<button
							className={"blue-background"}
						>
							Know more
						</button>
					</div>

					<div className="card-date">
						{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
					</div>
				</div>
			</div>
		);
	}

	getTagsContent() {
		if (this.props.info.company_tags
			&& this.props.companies) {
			return <div className="card-tags">
				{this.props.info.company_tags
					.filter((c) => this.props.companies.filter((d) => d.id === c).length > 0)
					.map((v) => <Chip
						key={this.props.companies.filter((d) => d.id === v)[0].name}
						label={this.props.companies.filter((d) => d.id === v)[0].name}
						color={"#ffa8b0"}
						url={"/company/" + v}
					/>)}
			</div>;
		}

		return null;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="JobOfferHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/news/" + this.props.info.handle} className="JobOfferHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
