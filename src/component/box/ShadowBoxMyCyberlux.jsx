import React from "react";
import "./ShadowBoxMyCyberlux.css";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class ShadowBoxMyCyberlux extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section red-shadow-section centered-shadow-section">
				{/* eslint-disable no-script-url */}
				<a
					href={getPrivateAppURL()}
					target="_blank"
					rel="noreferrer">
					<div>
						<h3>Private space</h3>
						<i className="fas fa-plug"/>
						<div className="PageHome-newsletter-content-desc">
							Register or update your company and show the best
							of your organisation
						</div>
					</div>
				</a>
			</div>
		);
	}
}
