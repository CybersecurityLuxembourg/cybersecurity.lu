import React, { Component } from "react";
import "./JobOfferHorizontal.css";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL, getEcosystemAppURL } from "../../utils/env.jsx";
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
					<div className="img-square-wrapper">
						{this.props.info.company_tags !== null
							&& this.props.info.company_tags !== undefined
							&& this.props.info.company_tags.length > 0
							&& this.props.info.company_tags[0].image !== null
							? <img
								className="card-img-top"
								src={getApiURL() + "public/get_image/" + this.props.info.company_tags[0].image}
								alt="Company logo"/>
							: <NoImage/>
						}
						<div className="card-date">
							{dateToString(this.props.info.publication_date, "DD MMM YYYY")}
						</div>
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						{this.getTagsContent()}

						<button
							className={"blue-background"}
						>
							Know more
						</button>
					</div>
				</div>
			</div>
		);
	}

	getTagsContent() {
		if (this.props.analytics !== null
			&& this.props.analytics !== undefined
			&& this.props.analytics.taxonomy_values !== undefined
			&& this.props.info.company_tags !== undefined) {
			return <div className="card-tags">
				{this.props.info.company_tags.map((v) => <Chip
					key={v.name}
					label={v.name}
					color={"#ffa8b0"}
					url={getEcosystemAppURL() + "company/" + v.id}
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
