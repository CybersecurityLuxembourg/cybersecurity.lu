import React, { Component } from "react";
import "./Tool.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import CardSocialMedia from "./CardSocialMedia.jsx";

export default class Tool extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getImage() {
		const baseUrl = getApiURL() + "public/get_public_image/";

		if (this.props.info.image) {
			return baseUrl + this.props.info.image;
		}

		if (!this.props.info.is_created_by_admin
			&& this.props.info.entity_tags
			&& this.props.info.entity_tags.length > 0
			&& this.props.entities) {
			const entities = this.props.entities
				.filter((c) => this.props.info.entity_tags.indexOf(c.id) >= 0)
				.filter((c) => c.image);

			if (entities.length > 0) {
				return baseUrl + entities[0].image;
			}
		}

		return null;
	}

	getBoxContent() {
		return <div className="Tool card">
			<div className="card-img-wrapper">
				{this.getImage()
					? <img
						className="card-img-top"
						src={this.getImage()}
						alt="Tool image"/>
					: <NoImage
						height={200}
					/>
				}
			</div>
			<div className="card-body">
				<h5 className="card-title">{this.props.info.title}</h5>

				<div className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</div>

				<button
					className={"blue-background"}
				>
					Know more
				</button>

				<CardSocialMedia
					article={this.props.info}
				/>
			</div>
		</div>;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="Tool-link">
				{this.getBoxContent()}
			</a>
			: <Link
				to={"/tool/" + this.props.info.handle}
				className="Tool-link">
				{this.getBoxContent()}
			</Link>;
	}
}
