import React from "react";
import "./CyberWeekGala.css";
import ShadowBox from "../box/ShadowBox.jsx";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class CyberWeekGala extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekGala"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<img
							className="CyberWeekGala-image"
							src="img/cswl_gala_banner_2022.jpg"
							alt="CSWL 2022"
						/>
					</div>

					<div className="col-md-12">
						<h2>Gala & Awards Night</h2>
					</div>

					<div className="col-md-12">
						<p>The Awards & Gala Night celebrates the most promising
						cybersecurity talents & professionals in various categories:</p>
					</div>

					<div className="col-md-12">
						<ul>
							<li>
								CISO of the Year
							</li>
							<li>
								DPO of the Year
							</li>
							<li>
								Most Promising Young Talent (selected from
								the national team participating in the&nbsp;
								<a href="https://ecsc.eu/" target="_blank" rel="noreferrer">European Cybersecurity Challenge</a>)
							</li>
							<li>
								Cybersecurity & Privacy Solution
								of the Year (sponsored by <a href="https://www.pwc.lu/" target="_blank" rel="noreferrer">PwC Luxembourg</a>)
							</li>
						</ul>
					</div>

					<div className="col-md-12">
						<h3>
							Applications are now open for the CISO of the
							Year & DPO of the Year Awards.
						</h3>
					</div>

					<div className="col-md-12">
						<h3>Why to apply?</h3>

						<ul>
							<li>
								Give visibility to your work and
								achievements as well as your organisation
								and increase your credibility
							</li>
							<li>
								Evaluation by peers, expand your network
							</li>
							<li>
								Become even more active in the cybersecurity
								community and help increase its voice (via various
								opportunities such as participating in interviews,
								networking sessions, conferences, awareness sessions,
								mentorships, etc)
							</li>
						</ul>
					</div>

					<div className="col-md-12">
						<h3>How to apply?</h3>

						<p>
							Create an account or log in to our community app to reach
							the questionnaire. The jury will determine if you are the professional
							of the year.
						</p>
					</div>

					<div className="col-md-2"/>

					<div className="col-md-4">
						<ShadowBox
							onClick={() => window.open(getPrivateAppURL() + "form?tab=1", "_blank")}
							title={"DPO award"}
							icon={"fas fa-user-lock"}
							abstract={"Connect and fill in the questionnaire"}
						/>
					</div>

					<div className="col-md-4">
						<ShadowBox
							onClick={() => window.open(getPrivateAppURL() + "form?tab=2", "_blank")}
							title={"CISO award"}
							icon={"fas fa-user-shield"}
							abstract={"Connect and fill in the questionnaire"}
						/>
					</div>

					<div className="col-md-12">
						<h3>Attend the Gala & Awards Night</h3>

						<p>Registration will open soon. Keep posted.</p>
					</div>
				</div>
			</div>
		);
	}
}
