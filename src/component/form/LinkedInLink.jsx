import React, { Component } from "react";
import "./LinkedInLink.css";

export default class LinkedInLink extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	buildUrl() {
		let url = "http://www.linkedin.com/shareArticle?mini=true";

		if (this.props.article.title) {
			url += "&title=" + this.props.article.title.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		if (this.props.article.link && this.props.article.link.length > 3) {
			url += "&url=" + this.props.article.link.replaceAll("/", "%2F").replaceAll(":", "%3A");
		} else {
			url += "&url=" + (window.location.origin + "/news/" + this.props.article.handle)
				.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		return url;
	}

	render() {
		if (!this.props.article) {
			return null;
		}

		return <div className="LinkedInLink">
			<a
				className="LinkedInLink-link"
				href={this.buildUrl()}
				target="_blank"
				rel="noreferrer">
				<i className="fab fa-linkedin-in"/>
			</a>
		</div>;
	}
}
