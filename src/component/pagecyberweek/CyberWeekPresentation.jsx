import React from "react";
import "./CyberWeekPresentation.css";

export default class CyberWeekPresentation extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekPresentation"}>
				<div className="row row-spaced">
					<div className="col-md-12 row-spaced">
						<h2>CSWL 2022 RECAP - Relieve the experience</h2>
					</div>

					<div className="col-md-12 row-spaced">
						<iframe
							title="CSWL 2022 - RECAP"
							src="https://peertube.securitymadein.lu/videos/embed/81bd7059-432d-4182-92cc-caa62e88ee72"
							allowFullScreen=""
							sandbox="allow-same-origin allow-scripts allow-popups"
							width="560"
							height="315"
						/>
					</div>

					<div className="col-md-12 row-spaced"/>
					<div className="col-md-12 row-spaced"/>
					<div className="col-md-12 row-spaced"/>
					<div className="col-md-12 row-spaced"/>
				</div>
			</div>
		);
	}
}
