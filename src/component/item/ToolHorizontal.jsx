import React, { Component } from "react";
import "./ToolHorizontal.css";
import dompurify from "dompurify";
import Chip from "../form/Chip.jsx";

export default class ToolHorizontal extends Component {
	constructor(props) {
		super(props);

		this.getBoxContent = this.getBoxContent.bind(this);
		this.getTagsContent = this.getTagsContent.bind(this);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="ToolHorizontal card">
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
		return <a
			href={"/tool/" + this.props.info.handle}
			className="Article-link">
			{this.getBoxContent()}
		</a>;
	}
}
