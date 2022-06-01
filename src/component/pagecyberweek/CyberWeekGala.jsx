import React from "react";
import "./CyberWeekGala.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekGala extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekGala"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Gala & Awards night</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="cybersecurityweek?tab=About_the_gala"
							title={"About the Gala"}
							icon={"fas fa-user-tie"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cybersecurityweek?tab=The_awards"
							title={"View the Awards"}
							icon={"fas fa-trophy"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
