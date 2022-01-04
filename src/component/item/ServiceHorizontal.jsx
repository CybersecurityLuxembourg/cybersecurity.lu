import React, { Component } from "react";
import "./ServiceHorizontal.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";

export default class ArticleHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTaxonomyTagsContent = this.getTaxonomyTagsContent.bind(this);
		this.getCompanyTagsContent = this.getCompanyTagsContent.bind(this);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="ServiceHorizontal card">
				<div className="card-horizontal">
					<div className="img-square-wrapper">
						{this.props.info.image !== null && this.props.info.image !== undefined
							? <img
								className="card-img-top"
								src={getApiURL() + "public/get_public_image/" + this.props.info.image}
								alt="Card image cap"/>
							: <NoImage/>
						}
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						{this.getCompanyTagsContent()}
						{this.getTaxonomyTagsContent()}

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

	getTaxonomyTagsContent() {
		if (this.props.analytics !== null
			&& this.props.analytics !== undefined
			&& this.props.analytics.taxonomy_values !== undefined
			&& this.props.info.taxonomy_tags !== undefined) {
			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => this.props.info.taxonomy_tags.indexOf(v.id) >= 0)
				.sort((a, b) => (b.category < a.category ? 1 : -1));

			return <div className="card-tags">
				{taxonomyValues.map((v) => <Chip
					key={v.name}
					label={v.name}
					url={"/search?taxonomy_value=" + v.id}
				/>)}
			</div>;
		}

		return "";
	}

	getCompanyTagsContent() {
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
				className="ServiceHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/service/" + this.props.info.handle} className="ServiceHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
