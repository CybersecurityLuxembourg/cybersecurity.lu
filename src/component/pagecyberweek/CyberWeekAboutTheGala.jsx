import React from "react";
import "./CyberWeekAboutTheGala.css";

export default class CyberWeekAboutTheGala extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekAboutTheGala"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<img
							className="CyberWeekAboutTheGala-image"
							src="img/cswl_gala_banner_2022.jpg"
							alt="CSWL 2022"
						/>
					</div>

					<div className="col-md-12">
						<h2>About the Gala</h2>
					</div>

					<div className="col-md-12">
						<p>The Awards & Gala Night is the flagship and closing event of the Cybersecurity
						Week Luxembourg that brings together the cybersecurity community and celebrates
						the most promising cybersecurity talents & professionals in several categories:</p>
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
								Most Promising Young Talent
							</li>
							<li>
								Cybersecurity & Privacy Solution of the Year (by&nbsp;
								<a
									href="https://www.pwc.lu/en/advisory/digital-tech-impact/cyber-security/cybersecurityday.html"
									target="_blank"
									rel="noreferrer"
								>
									PwC
								</a>)
							</li>
						</ul>
					</div>

					<div className="col-md-12">
						<p>This year, the Awards Ceremony will take place during a prestigious sit-down
						dinner, with lively entertainment and the participation of key personalities.</p>
						<p>This closing event will complement the intense and brand-new programme of
						the Cybersecurity Week Luxembourg, offering great networking opportunities.</p>
					</div>

					<div className="col-md-12 row-spaced">
						<h3>Get your ticket now</h3>
					</div>

					<div className="col-md-12 CyberWeekAboutTheGala-billing">
						<iframe
							title="Ticket shop"
							src="https://galacswl.xing-events.com/galacswl.html?viewType=iframe&distributionChannel=CHANNEL_IFRAME&language=en&resizeIFrame=true"
							frameBorder="0"
							width="650px"
							id="_amiandoIFrame4947409">
							<p>This page requires frame support. Please use a frame compatible browser
							to see the ticket sales module.</p>
						</iframe>
					</div>
				</div>
			</div>
		);
	}
}
