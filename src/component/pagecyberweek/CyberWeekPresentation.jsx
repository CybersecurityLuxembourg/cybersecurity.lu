import React from "react";
import "./CyberWeekPresentation.css";
import { Link } from "react-router-dom";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekPresentation extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekPresentation"}>
				<div className="row row-spaced">
					<div className="col-md-12 row-spaced">
						<img
							className="CyberWeekPresentation-image"
							src="img/cswl_banner_2022.png"
							alt="CSWL 2022"
						/>
					</div>

					<div className="col-md-12 row-spaced">
						<p>
							For the first time, CYBERSECURITY Luxembourg intends to
							bring together the <b>entire cybersecurity ecosystem and key
							international partners</b> during the 2022 Cybersecurity Week
							Luxembourg edition, in the frame of the <b>European Cyber
							Security Month</b>. This global event will showcase <b>a conference
							stream and an exhibition area</b>, where each actor will be
							offered the opportunity to be visible and share its expertise
							with its peers, potential partners, customers and new joiners.
						</p>

						<p>
							The event is intended to involve public and private actors
							coming from Luxembourg, the neighbouring region, Europe and beyond.
						</p>

						<p>
							Full details of the event as well as the programme will be unveiled
							on the event website as we go. Keep an eye on
							the <Link to="/cybersecurityweek?tab=Programme">Programme</Link> tab.
						</p>
					</div>

					<div className="col-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open("https://www.xing.com/events/cybersecurity-week-luxembourg-3940793", "_blank")}
							title="Register to the CSWL"
							icon="fas fa-marker"
						/>
					</div>
				</div>
			</div>
		);
	}
}
