import React from "react";
import "./ShadowBoxJobs.css";
import { Link } from "react-router-dom";

export default class ShadowBoxJobs extends React.Component {
	getColor() {
		if (this.props.color) {
			return this.props.color;
		}

		return "blue";
	}

	render() {
		return (
			<div className={"shadow-section " + this.getColor() + "-shadow-section centered-shadow-section"}>
				<Link to={"jobs"}>
					<div>
						<h3>Jobs</h3>
						<i className="fas fa-briefcase"/>
						<div>
							Check out the open jobs you can find in the cybersecurity space
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
