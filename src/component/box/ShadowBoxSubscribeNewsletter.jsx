import React from "react";
import "./ShadowBoxSubscribeNewsletter.css";

export default class ShadowBoxSubscribeNewsletter extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div
				className="shadow-section blue-shadow-section centered-shadow-section"
				onClick={() => this.props.ml_account("webforms", "3328240", "r1e0z6", "show")}>
				<div>
					<h3>Subscribe to the newsletter!</h3>

					<i className="fas fa-paper-plane"/>
				</div>
			</div>
		);
	}
}
