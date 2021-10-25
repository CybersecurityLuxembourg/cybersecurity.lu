import React, { Component } from "react";
import "./ArticleHorizontal.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";
import { dateToString } from "../../utils/date.jsx";

export default class ArticleHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTagsContent = this.getTagsContent.bind(this);

		this.state = {
		};
	}

	getImage() {
		const baseUrl = getApiURL() + "public/get_public_image/";

		if (this.props.info.image) {
			return baseUrl + this.props.info.image;
		}

		if (!this.props.info.is_created_by_admin
			&& this.props.info.company_tags
			&& this.props.info.company_tags.length > 0
			&& this.props.companies) {
			const companies = this.props.companies
				.filter((c) => this.props.info.company_tags.indexOf(c.id) >= 0)
				.filter((c) => c.image);

			if (companies.length > 0) {
				return baseUrl + companies[0].image;
			}
		}

		return null;
	}

	getBoxContent() {
		return (
			<div className="ArticleHorizontal card">
				<div className="card-horizontal">
					<div className="img-square-wrapper">
						{this.getImage()
							? <img
								className="card-img-top"
								src={this.getImage()}
								alt="Article image"/>
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
				{this.props.info.abstract !== null && this.props.info.abstract.length > 0
					&& <div className="card-text">
						<div dangerouslySetInnerHTML={{
							__html:
							dompurify.sanitize(this.props.info.abstract),
						}} />
					</div>
				}
			</div>
		);
	}

	getTagsContent() {
		if (this.props.analytics !== null
			&& this.props.analytics !== undefined
			&& this.props.analytics.taxonomy_values !== undefined
			&& this.props.info.taxonomy_tags !== undefined) {
			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => ["ARTICLE CATEGORY", "SERVICE GROUP"].indexOf(v.category) >= 0)
				.filter((v) => this.props.info.taxonomy_tags.indexOf(v.id) >= 0)
				.sort((a, b) => (b.category < a.category ? 1 : -1));

			if (taxonomyValues.length === 0) {
				return null;
			}

			return <div className="card-tags">
				{taxonomyValues.map((v) => <Chip
					key={v.name}
					label={v.name}
					url={"/search?taxonomy_value=" + v.id}
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
				className="ArticleHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/news/" + this.props.info.handle} className="ArticleHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
