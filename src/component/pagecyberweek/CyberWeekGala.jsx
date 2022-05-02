import React from "react";
import "./CyberWeekGala.css";

export default class CyberWeekGala extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekGala"}>
				<div className="row row-spaced">
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
								of the Year (sponsored by PwC)
							</li>
						</ul>
					</div>

					<div className="col-md-12">
						<h4>
							Applications are now open for the CISO of the
							Year & DPO of the Year Awards.
						</h4>
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
								Evaluation by peers
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

						<p>Dedicated forms</p>
					</div>

					<div className="col-md-12">
						<h3>Attend the Gala & Awards Night</h3>

						<p>Register</p>
					</div>
				</div>
			</div>
		);
	}
}
