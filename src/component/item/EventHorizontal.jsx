import React, { Component } from "react";
import "./EventHorizontal.css";
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
						<div className="card-date">
							{this.props.info.start_date !== null && this.props.info.end_date !== null
								? <div>
									{dateToString(this.props.info.start_date, "DD MMM YYYY HH:mm")}
									<br/>
									{dateToString(this.props.info.end_date, "DD MMM YYYY HH:mm")}
								</div>
								: "No info"
							}
						</div>
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>

						<p className="card-text">
							<div dangerouslySetInnerHTML={{
								__html:
								dompurify.sanitize(this.props.info.abstract),
							}} />
						</p>

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
								Know more
							</button>
						}
					</div>
				</div>
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
			: <Link to={"/calendar/" + this.props.info.handle} className="EventHorizontal-link">
				{this.getBoxContent()}
			</Link>;
	}
}
