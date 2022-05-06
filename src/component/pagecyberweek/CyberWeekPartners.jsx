import React from "react";
import "./CyberWeekPartners.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekPartners extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekPartners"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Become a sponsor</h2>
					</div>

					<div className="col-md-12">
						<p>Take advantage of this new opportunity by expressing
						your interest in any of the following options:</p>
					</div>

					<div className="col-md-12">
						<ul>
							<li>
								Become sponsor of the event
							</li>
							<li>
								Book a booth in the exhibition area
							</li>
							<li>
								Suggest a speaking contribution (topics and speakers)
							</li>
						</ul>
					</div>

					<div className="col-md-12 row-spaced">
						Reach out to <a href="mailto:info@cybersecurityweek.lu">info@cybersecurityweek.lu</a>.
					</div>

					<div className="col-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open("pdf/CSWL_2022_packages.pdf", "_blank")}
							title="Download the packages description"
							icon="fas fa-file-pdf"
						/>
					</div>
				</div>
			</div>
		);
	}
}
