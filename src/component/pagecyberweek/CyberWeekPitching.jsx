import React from "react";
import "./CyberWeekPitching.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekPitching extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekSponsor"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Pitching session</h2>
					</div>

					<div className="col-md-12 row-spaced">
						<h3>
							We are thrilled to announce that for the first time
							we are hosting a pitching session for cybersecurity
							startups.
						</h3>

						<p>
							The <a
								href="https://www.cybersecurity.lu/news/call-for-pitches---cybersecurity-startups---cswl222"
								target="_blank"
								rel="noreferrer">Call for Pitches</a> is now
							open until 10 October 2022 (23:59 CET).
						</p>

						<p>
							You are a startup active in the cybersecurity
							field? This is a not-to-be-missed opportunity.
						</p>

						<p>
							Seize your chance <b>to pitch in front of investors & cybersecurity
							experts and receive invaluable feedback & visibility</b>. The pitching
							session will be hosted in the frame of the Cybersecurity Week
							Luxembourg, on 20 October 2022 from 12:00-13:15 (CET) at LUXEXPO THE BOX.
						</p>
					</div>

					<div className="col-md-6 offset-md-3 row-spaced">
						<ShadowBox
							link="https://www.xing.com/events/cybersecurity-week-luxembourg-3949197"
							title={"Don't forget to register to participate in CSWL2022 here"}
							icon={"fas fa-marker"}
							color={"blue"}
						/>
					</div>

					<div className="col-md-12">
						<h3>
							How to participate?
						</h3>

						<p>
							<b>Submit your 4-slide pitch deck by 10 October 2022 (23:59)
							to <a href="mailto:info@c3.lu">info@c3.lu</a> (no more than 4 slides).</b>
						</p>

						<p>
							Up to <b>8 best decks</b> will get the opportunity to pitch on the main stage
							of the Cybersecurity Week Luxembourg.
						</p>

						<p>
							The <b>3 best pitches</b> will make it to the finals and will be rewarded with
							an exclusive invitation to the Cybersecurity Week Luxembourg Gala & Awards
							Night (for 2 representatives strictly). This will be an excellent occasion
							to network and meet potential customers and partners.
						</p>

						<p>
							Finally, <b>one talented winner</b> will be crowned.
						</p>
					</div>

					<div className="col-md-12">
						<h3>
							In a few words, why should you participate?
						</h3>

						<ul>
							<li>Benefit from an invaluable visibility at a renowned cybersecurity event
							gathering key actors of the cybersecurity scene,</li>
							<li>Showcase your company in front of investors, media and potential customers
							and partners,</li>
							<li>Take the chance to pitch in front of cybersecurity experts and investors,</li>
							<li>Receive feedback from a panel of experienced investors, </li>
							<li>A great learning experience,</li>
							<li>Get the opportunity to network with industry insiders during the
							Gala & Awards Night.</li>
						</ul>
					</div>

					<div className="col-md-12">
						<h3>
							Send your deck to <a
								href="mailto:info@c3.lu">
								info@c3.lu</a> and register for the event <a
								href="https://www.xing.com/events/cybersecurity-week-luxembourg-3949197"
								target="_blank"
								rel="noreferrer">
								here</a>.
						</h3>
					</div>
				</div>

				<div className="row row-spaced"/>
			</div>
		);
	}
}
