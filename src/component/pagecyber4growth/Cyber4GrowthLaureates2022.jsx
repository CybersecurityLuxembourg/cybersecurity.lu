import React from "react";
import "./Cyber4GrowthLaureates2022.css";
import { NotificationManager as nm } from "react-notifications";

export default class Cyber4GrowthLaureates2022 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	static copyToClipboard(text) {
		const dummy = document.createElement("input");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		dummy.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(dummy);
		nm.info("Copied to clipboard!");
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"Cyber4GrowthLaureates2022"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Laureates of 2022</h2>
					</div>

					<div className="col-md-3 order-1 order-md-2">
						<div className="shortcut-box">
							<h4>You want to be part of the experience?</h4>

							<h4>
								Please contact:
							</h4>

							<h4>
								<a
									href={"#"}
									onClick={() => Cyber4GrowthLaureates2022.copyToClipboard("team@cybersecurity-luxembourg.com")}>
									team@cybersecurity-luxembourg.com
								</a>
							</h4>
						</div>
					</div>

					<div className="col-md-9 order-2 order-md-1">
						<div className="row">
							<div className="col-md-12">
								Congratulation to our laureats... blablabla
							</div>
						</div>

						<div className="row Cyber4GrowthLaureates2022-images">
							<div className="col-md-2">
							</div>

							<div className="col-sm-6 col-md-4">
								<div>
									<img src={"/img/passbolt.png"}/>
								</div>
							</div>

							<div className="col-sm-6 col-md-4">
								<div>
									<img src={"/img/devseis.png"}/>
								</div>
							</div>

							<div className="col-md-2">
							</div>

							<div className="col-md-2">
							</div>

							<div className="col-sm-6 col-md-4">
								<a href="/search?r=passbolt">
									<i className="fas fa-search"/> Search for &quot;Passbolt&quot;
								</a>
							</div>

							<div className="col-sm-6 col-md-4">
								<a href="/search?r=devseis">
									<i className="fas fa-search"/> Search for &quot;Devseis&quot;
								</a>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								Another piece of text would be cool here.
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h2>What’s next?</h2>
							</div>

							<div className="col-md-12">
								<p>
									The two selected startups will participate in the <a href="https://ecs-org.eu/working-groups/european-cybersecurity-startup-award" target="_blank" rel="noreferrer">European Cybersecurity
									STARtup Award</a> that was created to <b>increase the awareness and visibility
									of state-of-the-art cybersecurity companies in Europe</b>, both at the
									European and the global levels. A robust European cybersecurity industry
									means a better protected digital Europe.
								</p>

								<p>
									European cybersecurity solution providers (particularly smaller
									companies) have often struggled for visibility in a fragmented
									European market. ECSO envisages therefore that this initiative will
									thus increase the European cybersecurity posture across citizens,
									businesses, and society, by increasing the prevalence of European
									uptake of European solutions.
								</p>

								<p>
									The Award is built around a shared belief that European cybersecurity
									companies delivering ground-breaking cybersecurity solutions need
									recognition and investment support to be able to scale up and develop
									their business in Europe.
								</p>

								<p>
									The Award leverages <b>ECSO’s Cyber Investors Day</b>, a well-established
									cybersecurity business matchmaking event, and similar events
									organised by ECSO’s partner organisations to create an initiative
									recognising the most promising European cybersecurity startups and SMEs.
								</p>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<h3>Mission & Objectives</h3>
							</div>

							<div className="col-md-12">
								<p>
									The Award links a series of local competitions endorsed by ECSO.
									The winners of each local event are selected by the respective
									local juries according to a setlist of criteria provided by ECSO
									and nominated for the final competition. Local winners are asked
									to present their solutions to the European jury, consisting of
									international investors, CISOs, representatives of large cybersecurity
									companies, ECSO representatives and cybersecurity experts, which make
									the final decision.
								</p>

								<p>
									European Cybersecurity STARtup Award has the ambition to become one
									of the key European initiatives, alongside <a href="https://ecs-org.eu/initiatives/cyber-investors-days" target="_blank" rel="noreferrer">ECSO’s Cyber Investor Days</a> and
									its recent proposal to create a European cybersecurity fund-of-funds.
									These initiatives are dedicated to the consolidation of the still highly
									fragmented European cybersecurity market and strengthening of its entire
									cybersecurity ecosystem.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
