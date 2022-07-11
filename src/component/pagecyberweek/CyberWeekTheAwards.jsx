import React from "react";
import "./CyberWeekTheAwards.css";
import Popup from "reactjs-popup";
import ShadowBox from "../box/ShadowBox.jsx";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class CyberWeekTheAwards extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekTheAwards"}>
				<div className="row">
					<div className="col-md-12">
						<h2>The Awards – Why not you?</h2>
					</div>

					<div className="col-md-12">
						<p>The Awards & Gala Night celebrates the most promising
						cybersecurity talents & professionals in the following categories:</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4 offset-md-2">
						<Popup
							className={"Popup-small-size"}
							trigger={
								<ShadowBox
									className="CyberWeekTheAwards-ShadowBox-award-inhouse"
									title={"CISO of the Year"}
									icon={"fas fa-user-shield"}
									abstract={<div>
										<br/>
										<b style={{ fontSize: "22px" }}>It could be you!</b>
										<br/>
										<br/>
										Learn more about the award & how to apply
									</div>}
								/>
							}
							onOpen={() => this.getCoreStartups()}
							modal
						>
							{(close) => (
								<div className={"row"}>
									<div className={"col-md-12"}>
										{// eslint-disable-next-line
										}<h2>CISO of the Year</h2>
										<div className="top-right-buttons">
											<button
												className={"red-background"}
												onClick={close}>
												<i className="fas fa-times"/>
											</button>
										</div>
									</div>

									<div className={"col-md-12"}>
										<h3>The purpose of the Award</h3>
										<div>
											The CISO of the Year Awards was created
											to give a platform to the talented professionals
											that make up the Luxembourg ecosystem.
										</div>
										<div>
											The purpose of this recognition is to highlight their
											vision and great achievements, to extend their network
											and visibility in order to encourage exchanges within the
											CISO community.
										</div>
										<div>
											The CISO of the Year becomes the Ambassador of the community
											for the coming year and will be invited to several events
											to represent the Luxembourg ecosystem.
										</div>

										<h3>Why to apply?</h3>
										<ul>
											<li>
												Give visibility to your work and achievements
												as well as your organisation and increase your credibility
											</li>
											<li>
												Evaluation by peers, expand your network
											</li>
											<li>
												Become even more active in the cybersecurity
												community and help increase its voice (via various
												opportunities such as participating in
												interviews, networking sessions, conferences, awareness
												sessions, mentorships, etc)
											</li>
										</ul>

										<h3>How to apply? 3 steps.</h3>
										<ol>
											<li>
												Take your chance by answering this <b><a
													href={getPrivateAppURL() + "form?tab=2"}
													target="_blank"
													rel="noreferrer"
												>questionnaire
												</a> by
												01 OCTOBER 2022</b>. The questionnaire invites you to share
												your vision and thoughts on information security in the
												current context as well as to present your greatest
												achievement(s) and/or challenging project(s) you have
												worked on.
											</li>
											<li>
												A jury (to be announced soon) will select the participants
												who will proceed to the next stage: the interview with the
												jury. Selected candidates will be invited to present their
												application to the jury on <b>13 OCTOBER 2022 (in-person)</b>.
											</li>
											<li>
												The winner will be announced at the Gala & Awards
												Night on <b>20 OCTOBER 2022</b>.
											</li>
										</ol>

										<div className="centered">
											<button
												onClick={() => window.open(getPrivateAppURL() + "form?tab=2", "_blank")}
											>
												Apply here!
											</button>
										</div>
									</div>
								</div>
							)}
						</Popup>
					</div>
					<div className="col-md-4">
						<Popup
							className={"Popup-small-size"}
							trigger={
								<ShadowBox
									className="CyberWeekTheAwards-ShadowBox-award-inhouse"
									title={"DPO of the Year"}
									icon={"fas fa-user-lock"}
									abstract={<div>
										<br/>
										<b style={{ fontSize: "22px" }}>It could be you!</b>
										<br/>
										<br/>
										Learn more about the award & how to apply
									</div>}
								/>
							}
							onOpen={() => this.getCoreStartups()}
							modal
						>
							{(close) => (
								<div className={"row"}>
									<div className={"col-md-12"}>
										{// eslint-disable-next-line
										}<h2>DPO of the Year</h2>
										<div className="top-right-buttons">
											<button
												className={"red-background"}
												onClick={close}>
												<i className="fas fa-times"/>
											</button>
										</div>
									</div>

									<div className={"col-md-12"}>
										<h3>The purpose of the Award</h3>
										<div>
											The DPO of the Year Awards was created to give a
											platform to the talented professionals that make
											up the Luxembourg ecosystem.
										</div>
										<div>
											The purpose of this recognition is to highlight
											their vision and great achievements, to extend
											their network and visibility in order to encourage
											exchanges within the DPO community.
										</div>
										<div>
											The DPO of the Year becomes the Ambassador of the
											community for the coming year and will be invited to
											several events to represent the Luxembourg ecosystem.
										</div>

										<h3>Why to apply?</h3>
										<ul>
											<li>
												Give visibility to your work and achievements
												as well as your organisation and increase your credibility
											</li>
											<li>
												Evaluation by peers, expand your network
											</li>
											<li>
												Become even more active in the cybersecurity
												community and help increase its voice (via various
												opportunities such as participating in
												interviews, networking sessions, conferences, awareness
												sessions, mentorships, etc)
											</li>
										</ul>

										<h3>How to apply? 3 steps.</h3>
										<ol>
											<li>
												Take your chance by answering this <b><a
													href={getPrivateAppURL() + "form?tab=1"}
													target="_blank"
													rel="noreferrer"
												>questionnaire
												</a> by
												01 OCTOBER 2022</b>. The questionnaire invites you to share
												your vision and thoughts on information security in the
												current context as well as to present your greatest
												achievement(s) and/or challenging project(s) you have
												worked on.
											</li>
											<li>
												A jury (to be announced soon) will select the participants
												who will proceed to the next stage: the interview with the
												jury. Selected candidates will be invited to present their
												application to the jury on <b>13 OCTOBER 2022 (in-person)</b>.
											</li>
											<li>
												The winner will be announced at the Gala & Awards
												Night on <b>20 OCTOBER 2022</b>.
											</li>
										</ol>

										<div className="centered">
											<button
												onClick={() => window.open(getPrivateAppURL() + "form?tab=1", "_blank")}
											>
												Apply here!
											</button>
										</div>
									</div>
								</div>
							)}
						</Popup>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4 offset-md-2">
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
					<div className="col-md-4">
						<ShadowBox
							className="CyberWeekTheAwards-ShadowBox-award"
							onClick={() => window.open("https://www.pwc.lu/en/advisory/digital-tech-impact/cyber-security/cybersecurityday.html", "_blank")}
							title={"Cybersecurity & Privacy Solution of the Year"}
							abstract={<div>
								Sponsored & organised by
								<br/>
								<img src='/img/pwc_logo.png'/>
							</div>}
						/>
					</div>
				</div>

				<div className="row row-spaced">
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
