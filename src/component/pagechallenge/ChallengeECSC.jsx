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
					<h2>Luxembourg Challenge</h2>
				</div>

				<div className="col-md-12">
					<h3>Lêtz Cybersecurity Challenge - The national challenge is back!</h3>
				</div>

				<div className="col-md-4 offset-md-4">
					<img
						className="ChallengeLCSC-image"
						src="img/letz-cyberchallenge.jpg"
						alt="Lëtz Cybersecurity Challenge logo"
					/>
				</div>

				<div className="col-md-12">
					<h3>Join the CTF team!</h3>
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
						<div className="col-md-6">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5><b>LCSC Qualifiers</b><br/>30th of April to 4th of May</h5>
							</div>
						</div>

						<div className="col-md-6">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC
								</div>
								<h5><b>LuxSkills Cybersecurity</b><br/>2nd to 4th of May</h5>
							</div>
						</div>

						<div className="col-md-6 centered">
							<i className="fas fa-arrow-down"/>
						</div>

						<div className="col-md-6 centered">
							<i className="fas fa-arrow-down"/>
						</div>

						<div className="col-md-12">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LCSC finals
								</div>
								<h5><b>LCSC finals</b><br/>Mid-July</h5>
							</div>
						</div>

						<div className="col-md-12 centered">
							<i className="fas fa-arrow-down"/>
						</div>

						<div className="col-md-12">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeECSC-program-mobile"}>
									LuxSkills
								</div>
								<h5><b>ECSC Vienna</b><br/>12th to 17th of September</h5>
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
