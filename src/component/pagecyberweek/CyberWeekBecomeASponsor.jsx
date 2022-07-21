import React from "react";
import "./CyberWeekBecomeASponsor.css";
import ShadowBox from "../box/ShadowBox.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class CyberWeekBecomeASponsor extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekBecomeASponsor"}>
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
							onClick={() => window.open(getApiURL() + "public/get_public_document/CSWL22_brochure_sponsors.pdf", "_blank")}
							title="Download the packages description"
							icon="fas fa-file-pdf"
						/>
					</div>
				</div>
			</div>
		);
	}
}
