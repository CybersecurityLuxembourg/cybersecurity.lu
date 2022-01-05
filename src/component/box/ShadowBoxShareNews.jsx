import React from "react";
import "./ShadowBoxShareNews.css";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class ShadowBoxShareNews extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section blue-shadow-section centered-shadow-section">
				<a
					href={getPrivateAppURL()}
					target={"_blank"}
					rel="noreferrer"
				>
					<div className="PageNews-newsletter-content">
						<h3>Share your latest news here</h3>

						<i className="fas fa-feather-alt"/>

						<div className="PageNews-newsletter-content-desc">
							With just a few clicks, give your organisation
							a greater visibility.
							Log in to My CYBERLUX now.
						</div>
					</div>
				</a>
			</div>
		);
	}
}
