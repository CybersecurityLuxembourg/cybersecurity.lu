import React, { Component } from "react";
import "./EventHorizontal.css";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import Chip from "../form/Chip.jsx";

export default class ArticleHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTagsContent = this.getTagsContent.bind(this);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="EventHorizontal card">
				<div className="card-horizontal">
					<div className="img-square-wrapper">
						{this.props.info.image !== null && this.props.info.image !== undefined
							? <img
								className="card-img-top"
								src={getApiURL() + "public/get_image/" + this.props.info.image}
								alt="Card image cap"/>
							: <NoImage/>
						}
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>
						<div className="card-abstract">{this.props.info.abstract}</div>
						{this.getTagsContent()}

						{this.props.info.link !== null
							&& this.props.info.link !== undefined
							&& this.props.info.link.length > 0
							? <button
								className={"blue-background"}
							>
								Open website
							</button>
							: <button
								className={"blue-background"}
							>
								Read more
							</button>
						}
					</div>
				</div>
			</div>
		);
	}

	getTagsContent() {
		console.log(this.props.info);
		console.log(this.props.analytics);
		if (this.props.analytics !== null
			&& this.props.analytics !== undefined
			&& this.props.analytics.taxonomy_values !== undefined
			&& this.props.info.taxonomy_tags !== undefined) {
			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => ["ARTICLE CATEGORY", "SERVICE GROUP"].indexOf(v.category) >= 0)
				.filter((v) => this.props.info.taxonomy_tags.indexOf(v.id) >= 0)
				.sort((a, b) => (b.category < a.category ? 1 : -1));

			console.log(taxonomyValues);

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

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="EventHorizontal-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/news/" + this.props.info.handle} className="EventHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
