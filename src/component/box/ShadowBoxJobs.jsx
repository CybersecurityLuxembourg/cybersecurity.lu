import React from "react";
import "./ShadowBoxJobs.css";
import { Link } from "react-router-dom";

export default class ShadowBoxJobs extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section black-shadow-section centered-shadow-section">
				<Link to={"jobs"}>
					<div>
						<h3>Jobs</h3>
						<i className="fas fa-briefcase"/>
						<div>
							Check out the open jobs you can find in the cyber security space
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
