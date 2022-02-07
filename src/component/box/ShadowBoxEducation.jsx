import React from "react";
import "./ShadowBoxEducation.css";
import { Link } from "react-router-dom";

export default class ShadowBoxEducation extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section black-shadow-section centered-shadow-section">
				<Link
					to="education">
					<div className="PageNews-newsletter-content">
						<h3>Education</h3>
						<i className="fas fa-graduation-cap"/>
						<div>
							Check out the educational programs and training available in Luxembourg
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
