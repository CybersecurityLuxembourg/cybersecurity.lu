import React from "react";
import "./CyberWeekNetwork.css";

export default class CyberWeekNetwork extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekNetwork"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>INTERNATIONAL MATCHMAKING EVENT BY B2FAIR</h2>
					</div>

					<div className="col-md-2"/>

					<div className="col-md-8">
						<img
							src={"img/chamber_of_commerce_and_een.png"}
							alt={"Chamber of commerce and Enterprise Europe Network"}
						/>
					</div>

					<div className="col-md-12">
						<p>This year will mark the new edition of the Cybersecurity
						International Business Meetings by <i>b2fair®</i>, organised by the
						Enterprise Europe Network of the Luxembourg Chamber of
						Commerce. This international business exchange platform will
						optimise your participation in the Cybersecurity Week Luxembourg
						whilst establishing qualified contacts with exhibitors and visitors
						through targeted business meetings.</p>

						<p>The event will provide you with a unique matchmaking
						experience, combining both the personalised professional guidance
						of an experienced matchmaking team and the advantages of a digital
						business platform driven by AI technology. It will enhance your
						matchmaking experience by suggesting suitable leads and offering you
						a riveting business networking before, during and after the event.</p>
					</div>

					<div className="col-md-12">
						<h3>ADVANTAGES:</h3>

						<ul>
							<li>
								Opportunity to build new sustainable partnerships;
							</li>
							<li>
								Gain insights into the latest cybersecurity trends;
							</li>
							<li>
								Access to an international audience;
							</li>
							<li>
								Personalised support before, during and after the event.
							</li>
						</ul>

						<h3>PARTICIPATION CONDITIONS:</h3>

						<p>Early Bird until 17th September 2022: EUR 75 / Participant</p>

						<p>After 17th September 2022: EUR 100 / Participant</p>

						<h3>HOW DOES IT WORK?</h3>

						<p>Step 1: Register on <a
							href="https://app.swapcard.com/event/cswl-matchmaking-event"
							target="_blank"
							rel="noreferrer"
						>the platform</a>. Create your company’s profile
						and define your business cooperation requirements.</p>

						<p>Step 2: Access your personal account. Generate new leads by
						adding more information about your company and interests.</p>

						<p>Step 3: Start engaging with other participants through the
						booking of individual meetings thanks to the AI powered matchmaking.</p>

						<p>Step 4: Get personal assistance and advice from the Matchmaking
						team on creating an attractive profile and accelerating your
						international matchmaking experience.</p>

						<p>Step 5: Participate actively in the event and meet your potential
						business partners during the event.</p>
					</div>
				</div>
			</div>
		);
	}
}
