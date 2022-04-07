import React from "react";
import "./ChallengeRegister.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class ChallengeRegister extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="ChallengeRegister" className="row">
				<div className="col-md-12">
					<h2>How to register</h2>
				</div>

				<div className="col-md-12 centered">
					<h3>Wann s de eppes kanns, weis et!</h3>
				</div>

				<div className="col-md-12">
					<p>
						Show us what you got and register for
						LuxSkills or LCSC Qualifier. You cannot participate in both!
					</p>

					<p>
						Make your choice:
					</p>
				</div>

				<div className="col-md-12">
					<div className="row row-spaced ChallengeRegister-program">
						<div className="col-md-4">
						</div>
						<div className="col-md-4 centered">
							<h3>LuxSkills</h3>
						</div>
						<div className="col-md-4 centered">
							<h3>LCSC</h3>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>Venue</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>LuxExpo The Box</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>Remote</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>Date</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
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
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>30th of April to 4th of May<br/>(continuously)</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>Age</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Born after 1st of January 1998
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									All
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>Nationality</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									All
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									All
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4># challenges</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									24-30
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									24-30
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>Format</h4>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									CTF - Jeopardy
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									CTF - Jeopardy
								</h5>
							</div>
						</div>

						<div className="col-md-4 ChallengeRegister-program-criteria">
							<h4>What&apos;s in it for you</h4>
						</div>

						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Participation in the LCSC finals
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Nomination for the &quot;Most Promising Young Talent 2022&quot; Award
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Participation in the ECSC in Vienna
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LuxSkills
								</div>
								<h5>
									Participation in the EuroSkills in Lyon 2023
								</h5>
							</div>
						</div>
						<div className="col-md-4">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									Participation in the LCSC finals
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									Nomination for the &quot;Most Promising Young Talent 2022&quot; Award
								</h5>
							</div>
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<div className={"ChallengeRegister-program-mobile"}>
									LCSC
								</div>
								<h5>
									Participation in the ECSC in Vienna
								</h5>
							</div>
						</div>
					</div>

					<div className="row row-spaced">
						<div className="col-md-12">
							<h3>Ready to start hacking and capture the flags?</h3>
						</div>

						<div className="col-md-6">
							<ShadowBox
								link="https://www.hacking-lab.com/events/13"
								title={"Register for LCSC!"}
								icon={"fas fa-flag"}
							/>
						</div>

						<div className="col-md-6">
							<ShadowBox
								link="https://www.hacking-lab.com/events/13"
								title={"Register for LuxSkills!"}
								icon={"fas fa-flag"}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
