import React from "react";
import "./ShadowBoxBecomePartner.css";

export default class ShadowBoxBecomePartner extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section blue-shadow-section centered-shadow-section">
				<a
					href="mailto:info@cybersecurity-luxembourg.com"
					subject="Organisation of a Cybersecurity Breakfast">
					<div className="PageNews-newsletter-content">
						<h3>Become a partner</h3>
						<i className="fas fa-handshake"/>
						<div className="PageNews-newsletter-content-desc">
							Cybersecurity Breakfast is a monthly series.
							If you are interested in organising an edition
							or becoming partner of the month,
							please contact us.
						</div>
					</div>
				</a>
			</div>
		);
	}
}
