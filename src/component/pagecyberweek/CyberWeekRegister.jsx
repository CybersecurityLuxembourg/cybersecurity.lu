import React from "react";
import "./CyberWeekRegister.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekContactUs extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekRegister"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Register</h2>
					</div>

					<div className="col-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open("https://www.xing.com/events/3949197", "_blank")}
							title="Register to the CSWL"
							icon="fas fa-marker"
						/>
					</div>

					<div className="col-md-12 row-spaced"/>
				</div>
			</div>
		);
	}
}
