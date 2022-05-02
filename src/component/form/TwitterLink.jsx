import React, { Component } from "react";
import "./TwitterLink.css";

export default class TwitterLink extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	buildUrl() {
		let url = "https://twitter.com/intent/tweet?";
		const textSize = Math.min(this.props.article.title.length,
			280 - (this.props.article.link ? this.props.article.link.length + 4 : 0));

		if (this.props.article.title) {
			url += "text="
				+ (this.props.article.title.length === textSize
					? this.props.article.title
					: this.props.article.title.slice(0, textSize) + "...")
					.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		if (this.props.article.link && this.props.article.link.length > 3) {
			if (url.charAt(url.length - 1) !== "?") {
				url += "&";
			}
			url += "url=" + this.props.article.link
				.replaceAll("/", "%2F").replaceAll(":", "%3A");
		} else {
			if (url.charAt(url.length - 1) !== "?") {
				url += "&";
			}
			url += "url=" + (window.location.origin + "/news/" + this.props.article.handle)
				.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		return url;
	}

	render() {
		if (!this.props.article) {
			return null;
		}

		return <div className="TwitterLink">
			<a
				className="TwitterLink-link"
				href={this.buildUrl()}
				target="_blank"
				rel="noreferrer">
				<i className="fab fa-twitter"/>
			</a>
		</div>;
	}
}
