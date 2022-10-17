import React from "react";
import "./CyberWeekLDIH.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekLDIH extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekLDIH"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>L-DIH on tour</h2>
					</div>

					<div className="col-md-6 offset-md-3">
						<ShadowBox
							link="https://www.dih.lu/en-us/events/dih-on-tour-cybersecurity-week"
							title={"Visit on L-DIH website"}
							icon={"fas fa-handshake"}
							color={"blue"}
						/>
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
