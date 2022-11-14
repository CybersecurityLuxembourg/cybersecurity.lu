import React from "react";
import "./CyberWeekExperience.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekExperience extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekExperience"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>CSWL Experience</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="cybersecurityweek?tab=Photos"
							title={"Photos"}
							icon={"fas fa-images"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cybersecurityweek?tab=Replays"
							title={"Replays"}
							icon={"fas fa-film"}
							color={"blue"}
						/>
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
