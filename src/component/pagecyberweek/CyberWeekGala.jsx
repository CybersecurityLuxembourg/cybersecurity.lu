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

					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekGala-ShadowBox-award"
							onClick={() => window.open(getPrivateAppURL() + "form?tab=2", "_blank")}
							title={"CISO of the Year"}
							abstract={<div>Applications are now open!*</div>}
						/>
					</div>
					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekGala-ShadowBox-award"
							onClick={() => window.open(getPrivateAppURL() + "form?tab=1", "_blank")}
							title={"DPO of the Year"}
							abstract={<div>Applications are now open!*</div>}
						/>
					</div>
					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekGala-ShadowBox-award"
							onClick={() => window.open("https://ecsc.eu/", "_blank")}
							title={"Most Promising Young Talent"}
							abstract={<div>
								selected from the national team participating in European Cybersecurity Challenge
								<br/><br/>
								<img src='/img/ecsc-badge-current.png'/>
							</div>}
						/>
					</div>
					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekGala-ShadowBox-award"
							onClick={() => window.open("https://www.pwc.lu/en/advisory/digital-tech-impact/cyber-security/cybersecurityday.html", "_blank")}
							title={"Cybersecurity & Privacy Solution of the Year"}
							abstract={<div>
								Sponsored by
								<br/>
								<img src='/img/pwc_logo.png'/>
								<div>Applications are now open!</div>
							</div>}
						/>
					</div>

					<div className="col-md-12 row-spaced"/>

					<div className="col-md-8 offset-md-2 row-spaced centered">
						<i>* Create an account or log in to our community app to
						reach the questionnaire. The jury will determine if you
						are the professional of the year</i>
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
						<h3>Attend the Gala & Awards Night</h3>

						<p>Registration will open soon. Keep posted.</p>
					</div>
				</div>
			</div>
		);
	}
}
