import React from "react";
import "./ChallengeLCSC.css";

export default class ChallengeLCSC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="ChallengeLCSC" className="row">
				<div className="col-md-12">
					<h2>Lëtz Cybersecurity Challenge – Wann s de eppes kanns, weis et!</h2>
				</div>

				<div className="col-md-4 offset-md-4">
					<img
						className="ChallengeLCSC-image"
						src="img/letz-cyberchallenge.jpg"
						alt="Lëtz Cybersecurity Challenge logo"
					/>
				</div>

				<div className="col-md-12">
					<p>
						The Lëtz Cybersecurity Challenge (LCSC), is
						the annual National Hacking Championship of Luxembourg.
					</p>

					<p>
						If you love to play Capture the Flag (CTF), love Hacking
						and Cybersecurity, you are completely right here!
					</p>

					<p>
						<b>Important: EVERYONE</b> can join the qualifiers for fun!<br/>
						But to get further, the&nbsp;
						<span className="red">qualification requirements*</span> apply.
					</p>

					<div className="row">
						<div className="col-md-12">
							<div className="centered">
								<b>Join the national CTF Team and represent Luxembourg<br/>
								at the European Cybersecurity Challenge (ECSC)
								in Vienna – 13-17 September 2022</b>
							</div>
						</div>
					</div>

					<p>
						The&nbsp;
						<a href="https://www.ecsc2022.eu/about-ecsc/" target="_blank" rel="noreferrer">European Cyber Security Challenge</a>
						&nbsp;is an initiative by the
						European Union Agency for Cybersecurity (ENISA) and aims at
						enhancing cybersecurity talent across Europe and connecting
						high potentials with industry leading organizations.
					</p>
				</div>

				<div className="col-md-12">
					<h3>LCSC Overview</h3>
				</div>

				<div className="col-md-12 row-spaced">
					<p>
						The following overview shows the cycle of qualification and
						competitions. In the LCSC  Qualification, <b>everyone</b> can
						participate. However, only those eligible to participate
						at the ECSC or LuxSkills can be accepted for the LCSC Final.
					</p>

					<p>
						There are two ways to qualify for the LCSC Final: Either you
						participate in the LuxSkills Cybersecurity Competition or in the
						LCSC Qualifier. <b>You cannot participate in both!</b>
					</p>

					<p>
						The best players of each competition fulfilling the&nbsp;
						<span className="red">qualification requirements*</span> for the
						ECSC will advance to
						the next level: LCSC Final.
					</p>

					<p>
						The 10 that made the cut will join the&nbsp;
						<a href="https://letzpwn.com/" target="_blank" rel="noreferrer">national CTF Team LetzPwn</a>.<br/>
						Training sessions with EU cybersecurity experts will
						follow during summer.
					</p>
				</div>

				<div className="col-md-12">
					<div className="row">
						<div className="col-md-2 offset-md-3">
							<div className="shadow-section blue-shadow-section centered-shadow-section"/>
						</div>

						<div className="col-md-5">
							<h4>On site event</h4>
						</div>
					</div>

					<div className="row row-spaced">
						<div className="col-md-2 offset-md-3">
							<div className="shadow-section red-shadow-section centered-shadow-section"/>
						</div>

						<div className="col-md-5">
							<h4>Remote event</h4>
						</div>
					</div>
				</div>

				<div className="col-md-12">
					<div className="row row-spaced ChallengeLCSC-program">
						<div className="col-md-6">
							<div className="shadow-section red-shadow-section centered-shadow-section">
								<h5><b>LCSC Qualifiers</b><br/>30th of April to 4th of May</h5>
							</div>
						</div>

						<div className="col-md-6">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
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
								<h5><b>LCSC finals</b><br/>Mid-July</h5>
							</div>
						</div>

						<div className="col-md-12 centered">
							<i className="fas fa-arrow-down"/>
						</div>

						<div className="col-md-12">
							<div className="shadow-section blue-shadow-section centered-shadow-section">
								<h5><b>ECSC Vienna</b><br/>13th to 17th of September</h5>
							</div>
						</div>
					</div>
				</div>

				<div className="col-md-12">
					<p><span className="red">*Qualification requirements:</span></p>
					<ul>
						<li>Born between 01 January 1997 and 31 December 2005</li>
						<li>LU citizenship</li>
						<li>student or non it professional</li>
					</ul>
				</div>
			</div>
		);
	}
}
