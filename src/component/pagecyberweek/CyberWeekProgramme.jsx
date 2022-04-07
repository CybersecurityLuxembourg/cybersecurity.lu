import React from "react";
import "./CyberWeekProgramme.css";

export default class CyberWeekPresentation extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekProgramme"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Programme</h2>
					</div>

					<div className="col-md-12 centered row-spaced">
						<b><i>Conference stream, exhibition area, matchmaking & more.</i></b>
					</div>

					<div className="col-md-12">
						<p>
							The programme is currently being built and will be unveiled soon.
						</p>

						<p>
							If you wish to contribute content (topic(s) and/or speaker(s)),
							please reach out to us at <a href="mailto:info@cybersecurityweek.lu">info@cybersecurityweek.lu</a>.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
