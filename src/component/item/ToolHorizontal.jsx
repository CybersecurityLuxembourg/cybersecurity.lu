import React, { Component } from "react";
import "./ToolHorizontal.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import Chip from "../form/Chip.jsx";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import CardSocialMedia from "./CardSocialMedia.jsx";

export default class ToolHorizontal extends Component {
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

		return null;
	}

	getBoxContent() {
		return (
			<div className="ToolHorizontal card">
				<div className="card-horizontal">
					{this.props.showImage
						&& <div className="img-square-wrapper">
							{this.getImage()
								? <img
									className="card-img-top"
									src={this.getImage()}
									alt="Article image"/>
								: <NoImage/>
							}
						</div>
					}
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						{this.getTagsContent()}

						<button
							className={"blue-background"}
						>
							Know more
						</button>

						<CardSocialMedia
							article={this.props.info}
						/>
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
				.filter((v) => this.props.info.taxonomy_tags.indexOf(v.id) >= 0)
				.sort((a, b) => (b.category < a.category ? 1 : -1));

			if (taxonomyValues.length === 0) {
				return null;
			}

			return <div className="card-tags">
				{taxonomyValues.map((v) => <Chip
					key={v.name}
					label={v.name}
					url={"/search?taxonomy_values=" + v.id}
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
				className="ToolHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link
				to={"/tool/" + this.props.info.handle}
				className="ToolHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
