import React from "react";
import "./ShadowBoxSubscribeNewsletter.css";

export default class ShadowBoxSubscribeNewsletter extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div
				className="shadow-section blue-shadow-section centered-shadow-section"
				onClick={() => window.open("https://newsletter.cybersecurity-luxembourg.com/", "_blank")}>
				<div>
					<h3>Subscribe to the newsletter!</h3>

					<i className="fas fa-paper-plane"/>
				</div>
			</div>
		);
	}
}
