import React, { Component } from "react";
import "./TwitterLink.css";

export default class TwitterLink extends Component {
	constructor(props) {
		super(props);

		this.buildUrl = this.buildUrl.bind(this);

		this.state = {
		};
	}

	buildUrl() {
		let url = "https://twitter.com/intent/tweet?";
		const textSize = Math.min(this.props.text.length,
			280 - (this.props.url !== undefined ? this.props.url.length + 4 : 0));

		if (this.props.text !== undefined) {
			url += "text="
				+ (this.props.text.length === textSize
					? this.props.text
					: this.props.text.slice(0, textSize) + "...")
					.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		if (this.props.url !== undefined) {
			if (url.charAt(url.length - 1) !== "?") {
				url += "&";
			}
			url += "url=" + this.props.url.replaceAll("/", "%2F").replaceAll(":", "%3A");
		}

		return url;
	}

	render() {
		return <div className="TwitterLink">
			<a
				className="TwitterLink-link"
				href={this.props.text === undefined ? null : this.buildUrl()}
				disabled={this.props.text === undefined}
				target="_blank"
				rel="noreferrer">
				<i
					className="fab fa-twitter"
				/>
			</a>
		</div>;
	}
}
