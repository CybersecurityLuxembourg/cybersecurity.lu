import React from "react";
import "./CyberWeekTheAwards.css";
import ShadowBox from "../box/ShadowBox.jsx";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class CyberWeekTheAwards extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekTheAwards"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>The Awards – Why not you?</h2>
					</div>

					<div className="col-md-12">
						<p>The Awards & Gala Night celebrates the most promising
						cybersecurity talents & professionals in following categories:</p>
					</div>

					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekTheAwards-ShadowBox-award"
							onClick={() => window.open(getPrivateAppURL() + "form?tab=2", "_blank")}
							title={"CISO of the Year"}
							abstract={<div>
								Take your chance by answering this questionnaire. A jury (which will
								soon be unveiled) will select the professional of the year among
								all the participants.
							</div>}
						/>
					</div>
					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekTheAwards-ShadowBox-award"
							onClick={() => window.open(getPrivateAppURL() + "form?tab=1", "_blank")}
							title={"DPO of the Year"}
							abstract={<div>Take your chance by answering this questionnaire. A jury (which will
								soon be unveiled) will select the professional
								of the year among all the participants.
							</div>}
						/>
					</div>
					<div className="col-md-3">
						<ShadowBox
							className="CyberWeekTheAwards-ShadowBox-award"
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
							className="CyberWeekTheAwards-ShadowBox-award"
							onClick={() => window.open("https://www.pwc.lu/en/advisory/digital-tech-impact/cyber-security/cybersecurityday.html", "_blank")}
							title={"Cybersecurity & Privacy Solution of the Year"}
							abstract={<div>
								Sponsored & organised by
								<br/>
								<img src='/img/pwc_logo.png'/>
								<div>Apply here to pitch!</div>
							</div>}
						/>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12 row-spaced">
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

					<div className="col-md-12 row-spaced">
						<h3>Listen to the experience of Dalia Khader, CISO of the Year
						2021 & Matthieu Gatineau, DPO of the Year 2021</h3>
					</div>

					<div className="col-md-12 CyberWeekTheAwards-experience">
						<iframe
							title="CISO &amp; DPO of the Year 2022 are now open!"
							width="560"
							height="315"
							src="https://peertube.securitymadein.lu/videos/embed/d414d51b-6815-4c83-899d-555390476f2f"
							frameBorder="0"
							allowFullScreen=""
							sandbox="allow-same-origin allow-scripts allow-popups">
						</iframe>
					</div>
				</div>
			</div>
		);
	}
}
