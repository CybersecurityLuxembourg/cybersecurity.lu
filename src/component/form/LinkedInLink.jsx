import React, { Component } from "react";
import "./LinkedInLink.css";

export default class LinkedInLink extends Component {
	constructor(props) {
		super(props);

		this.buildUrl = this.buildUrl.bind(this);

		this.state = {
		};
	}

	buildUrl() {
		let url = "http://www.linkedin.com/shareArticle?mini=true";

		if (this.props.text !== undefined) {
			url += "&title=" + this.props.text.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		if (this.props.url !== undefined) {
			url += "&url=" + this.props.url.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		return url;
	}

	render() {
		return <div className="LinkedInLink">
			<a
				className="LinkedInLink-link"
				href={this.props.text === undefined ? null : this.buildUrl()}
				disabled={this.props.text === undefined}
				target="_blank"
				rel="noreferrer">
				<i
					className="fab fa-linkedin-in"
				/>
			</a>
		</div>;
	}
}
