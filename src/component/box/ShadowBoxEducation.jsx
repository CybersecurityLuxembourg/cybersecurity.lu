import React from "react";
import "./ShadowBoxEducation.css";
import { Link } from "react-router-dom";

export default class ShadowBoxEducation extends React.Component {
	getColor() {
		if (this.props.color) {
			return this.props.color;
		}

		return "blue";
	}

	render() {
		return (
			<div className={"shadow-section " + this.getColor() + "-shadow-section centered-shadow-section"}>
				<Link
					to="education">
					<div className="PageNews-newsletter-content">
						<h3>Education</h3>
						<i className="fas fa-graduation-cap"/>
						<div>
							Check out the educational programmes and training in
							the field of cybersecurity available in Luxembourg
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
