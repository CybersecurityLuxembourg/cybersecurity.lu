import React from "react";
import "./ChallengeECSC.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class ChallengeECSC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="ChallengeECSC" className="row">
				<div className="col-md-12">
					<h2>European Cyber Security Challenge</h2>
				</div>

				<div className="col-md-12">
					<p>
						Join the national CTF Team and represent Luxembourg at the
						European Cybersecurity Challenge (ECSC) in Vienna – 12-17
						September 2022.
					</p>

					<p>
						The&nbsp;
						<a href="https://www.ecsc2022.eu/about-ecsc/" target="_blank" rel="noreferrer">European Cyber Security Challenge</a>
						&nbsp;is an initiative by the
						European Union Agency for Cybersecurity (ENISA) and aims at
						enhancing cybersecurity talent across Europe and connecting
						high potentials with industry leading organizations.
					</p>

					<p>
						Either you participate in the&nbsp;
						<a href="https://www.worldskills.lu/" target="_blank" rel="noreferrer">LuxSkills</a>
						&nbsp;Cybersecurity Competition
						or in the Lëtz Cybersecurity Challenge. You cannot participate in
						both. The best players of each competition fulfilling the
						qualification requirements* for the ECSC will compete in the
						LCSC finals to be held in physical mid-July.
					</p>

					<p>
						The 10 best out of the LCSC finals will form the national CTF Team.
					</p>
				</div>

				<div className="col-md-3"/>
				<div className="col-md-6">
					<ShadowBox
						link="https://letzpwn.com/"
						title={"LetzPwn"}
						icon={"fas fa-flag"}
						abstract={"LetzPwn is a community that helps people, no matter their skill or age, to learn more about cybersecurity"}
					/>
				</div>

				<div className="col-md-12">
					<p>
						Training sessions with EU cybersecurity experts will follow during summer.
					</p>

					<ul>
						<li>*Born between 01 January 1997 and 31 December 2005</li>
						<li>LU citizenship</li>
					</ul>

					<p>
						Show us what you got and register for LuxSkills or LCSC:
					</p>
				</div>

				<div className="col-md-12">
					<div className="row row-spaced ChallengeECSC-program">
						<div className="col-md-4">
						</div>
						<div className="col-md-4 centered">
							<h3>LuxSkills</h3>
						</div>
						<div className="col-md-4 centered">
							<h3>LCSC</h3>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Venue</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>LuxExpo The Box</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>Remote</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Date</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									2nd to 4th of May<br/>
									Each day from 10am to 4pm
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>Until 4th of May<br/>(continuously)</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Age</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Born after 1st of January 1998
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									Born after 1st of January 1997
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Nationality</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									All
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									All
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4># challenges</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									24-30
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									24-30
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Format</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									CTF - Jeopardy
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									CTF - Jeopardy
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeECSC-program-criteria">
							<h4>Prize</h4>
						</div>

						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Participation in the LCSC finals
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Eligible for the &quot;Most Promising Young Talent 2022&quot; Award
								</h5>
							</div>
							<div className="shadow-section red-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Participation in the EuroSkills in Lyon 2023
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									Participation in the LCSC finals
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5>
									Eligible for the &quot;Most Promising Young Talent 2022&quot; Award
								</h5>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-12">
					<p>
						<b>Participation, travel and accommodation to ECSC2022 and
						EuroSkills 2023 are free of charge for the the participants.</b>
					</p>
				</div>
			</div>
		);
	}
}
