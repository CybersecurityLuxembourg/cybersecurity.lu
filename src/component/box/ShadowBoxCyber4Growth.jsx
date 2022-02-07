import React from "react";
import "./ShadowBoxBecomePartner.css";
import { Link } from "react-router-dom";

export default class ShadowBoxBecomePartner extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section black-shadow-section centered-shadow-section">
				<Link to="cyber4growth">
					<div>
						<h3>Cyber4Growth</h3>
						<i className="fas fa-rocket"/>
						<div className="PageNews-newsletter-content-desc">
							Get part to our program to improve your IT environment
							and increase you visibility
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
