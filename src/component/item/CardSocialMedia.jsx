import React, { Component } from "react";
import "./CardSocialMedia.css";
import TwitterLink from "../form/TwitterLink.jsx";
import LinkedInLink from "../form/LinkedInLink.jsx";

export default class Tool extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className={"card-social-media"}>
			<div className="card-social-media-share">
				Share:
			</div>
			<TwitterLink
				article={this.props.article}
			/>
			<LinkedInLink
				article={this.props.article}
			/>
		</div>;
	}
}
