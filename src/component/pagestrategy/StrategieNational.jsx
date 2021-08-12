import React from "react";
import "./StrategieNational.css";
import Popup from "reactjs-popup";
import Collapsible from "react-collapsible";

export default class StrategieNational extends React.Component {
	constructor(props) {
		super(props);

		this.part1 = React.createRef();
		this.part2 = React.createRef();
		this.part3 = React.createRef();
		this.part4 = React.createRef();
	}

	render() {
		return (
			<div className={"StrategieNational page max-sized-page"}>
				<h1>National Cybersecurity Strategy IV (NCSS IV)</h1>

				<div className="row">
					<div className="col-md-12">
						<h2 ref={this.part1}>Prime Minister Foreword</h2>
					</div>

					<div className="col-md-8">
						<div className="row">
							<div className="col-md-3">
								<img className="StrategieNational-pm-picture" src="/img/luxembourg.png"/>
							</div>

							<div className="col-md-9">
								<div className="StrategieNational-quote">
									<p>
										The national cybersecurity strategy for the period up to 2025 sets
										out the guidelines underlying the projects that the Government
										intends to implement in order to secure cyberspace at all levels.
										It goes hand-in-hand with the digital transformation that
										characterises our economy and our society.
									</p>
									<p>
										We are going through exceptional times in more than one way.
										We are witnessing the large-scale deployment of new technologies
										such as the fifth generation of mobile networks or new applications
										in the field of artificial intelligence. Existing digital
										infrastructures in Luxembourg, Europe and the world have
										been consolidated, enabling greater connectivity for more
										people with undeniable gains in reliability and availability,
										even though much remains to be done to ensure that no one is
										left behind in this digital revolution. At the same time,
										cybercriminals and other threat actors are taking advantage
										of these changes and using the new developments to increase
										attempts at intrusion, sabotage or online theft.
									</p>
									<p>
										Building on the experience acquired in the context of the third
										strategy adopted in April 2018 and mindful to taking into account
										the numerous facets of cybersecurity, the new strategy was drawn
										up by a multidisciplinary working group chaired by the High
										Commission for National Protection and consisting of representatives
										of the Ministry of Foreign and European Affairs, the Ministry of
										Economy, the EIG SECURITYMADEIN.LU, the Department of Media,
										Telecommunications and Digital Policy (SMC), the State Intelligence
										Service, the Luxembourg Regulatory Institute (ILR), the Directorate
										of Defence, the Government IT Centre (CTIE), the governmental
										CERT (GOVCERT) and the National Agency for Information Systems
										Security (ANSSI).
									</p>
									<p>
										The aim of the cybersecurity strategy is to enable all actors
										to participate fully in a digital society and to access the
										new technologies in a secure environment. The measures that
										will be implemented in this context are designed in the first
										place to ensure that Internet users are aware and to strengthen
										their trust in the digital world. Furthermore, they consist in
										consolidating and strengthening the security and resilience of
										digital networks and infrastructures. Lastly, the strategy
										seeks to take account of cybersecurity as a factor of economic
										attractiveness and to complement the strategy
										of dynamisation that characterises the digital sector towards
										the continued development of a
										high-performance digital economy.
									</p>
									<p>- Mr Xavier Bettel, Prime Minister</p>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-4">
						<div className="StrategieNational-shortcut-box">
							<h2 onClick={() => this.part1.current.scrollIntoView({ behavior: "smooth" })}>
								Prime Minister Foreword
							</h2>
							<h2 onClick={() => this.part2.current.scrollIntoView({ behavior: "smooth" })}>
								Context
							</h2>
							<h2 onClick={() => this.part3.current.scrollIntoView({ behavior: "smooth" })}>
								Objectives and priorities
							</h2>
							<h2 onClick={() => this.part4.current.scrollIntoView({ behavior: "smooth" })}>
								Read the full National Strategy
							</h2>
						</div>
					</div>

					<div className="col-md-12">
						<h2 ref={this.part2}>Context</h2>
					</div>

					<div className="col-md-8">
						<p>
							The world in 2021 is facing a multitude of international crises, ranging
							from the health crisis due to the COVID-19 pandemic, to the climate crisis,
							but also a deep crisis related to the social contract and political confidence
							in many countries.
						</p>

						<p>
							<b>All these crises have complex but undeniable relationships with information
							and communication technologies and systems: society’s dependence on the
							Internet and connectivity is growing.</b>
						</p>

						<p>
							At the same time, the attack surface is becoming more diverse with the
							introduction of new technologies, while geopolitical rivalries are impacting
							the security of the digital space. Malicious acts are undertaken by a multitude
							of state and non-state actors against diverse targets: government administrations,
							businesses and citizens are victims of such acts.
						</p>

						<p>
							With the massive introduction of fifth generation (5G) mobile data transmission,
							which promises to revolutionise connectivity worldwide, both for industrial and
							mission-critical applications and users/citizens, society will benefit from
							unprecedented speed of access to information and data availability, increased
							responsiveness and a significant improvement in connectivity capabilities.
						</p>

						<p>
							The transition to increasingly mobile technologies and the ever-increasing reliance
							on cloud computing solutions, as well as the continued development of the Internet
							of Things mean that human societies are increasingly connected but at the same time
							increasingly dependent on the availability and reliability of their data. Advances in
							quantum computing research suggest that the race between encryption and decryption
							technologies will continue.
						</p>

						<p>
							<b>
								This underlines the collective responsibility of political actors, ICT experts
								and industry, as well as citizens of all ages to become more independent and to
								use technology wisely, and even to demand trusted services and tools that meet
								their needs.
							</b>
						</p>
					</div>

					<div className="col-md-4">
						<div className="StrategieNational-stat-box">
							<h3>CIRCL&#39;s statistics</h3>

							<Popup
								trigger={<div>Sector repartition of the incidents in 2020</div>}
								modal
								closeOnDocumentClick
								className={"Popup-small-size"}
							>
								<div>
									<h3>
										<b>
											Sector repartition of the incidents reported to
											<a href="https://circl.lu/" target="_blank" rel="noreferrer"> CIRCL</a> in 2020:
										</b>
									</h3>

									<img src="/img/sector_repartition_of_incidents.png"/>

									<p>
										Source: CIRCL (
										<a href="https://circl.lu/opendata/statistics/" target="_blank" rel="noreferrer">
										https://circl.lu/opendata/statistics/
										</a>)
									</p>
								</div>
							</Popup>

							<Popup
								trigger={<div>
									Evolution of the yearly number of incidents in the past 10 years
								</div>}
								modal
								closeOnDocumentClick
								className={"Popup-small-size"}
							>
								<div>
									<h3>
										<b>
											Evolution of the yearly number of incidents reported to
											<a href="https://circl.lu/" target="_blank" rel="noreferrer"> CIRCL </a>
											in the past 10 years:
										</b>
									</h3>

									<img src="/img/evolution_number_of_incidents.png"/>
								</div>
							</Popup>
						</div>
					</div>

					<div className="col-md-8">
						<h2 ref={this.part3}>
							Objectives and priorities
						</h2>

						<p>
							The development of a new national cybersecurity strategy is a prime opportunity
							to review the state’s stance on information security awareness. In a spirit of
							openness and collaboration, the new strategy has been submitted for consultation
							to stakeholders at the national level: relevant ministries and administrations,
							private companies, professional information security researchers and civil society
							organisations.
						</p>

						<p>
							Luxembourg will engage more proactively in positive cooperation initiatives
							at global level, such as in the United Nations Secretary-General’s Digital
							Cooperation Action Plan. At European level, the EU’s digital hub is in a
							process of consolidation in the Grand Duchy of Luxembourg. The national
							cybersecurity ecosystem is booming.
						</p>

						<p>
							This strategy is part of a continuous process of improving coordination and
							procedures in the field of information security and builds on the lessons
							learned from the three previous national strategies (National Cybersecurity
							<a href="https://cybersecurite.public.lu/dam-assets/fr/scs-1-2011.pdf" target="_blank" rel="noreferrer"> I (2012)</a>,
							<a href="https://cybersecurite.public.lu/dam-assets/fr/lu-ncss-2-fr-booklet.pdf" target="_blank" rel="noreferrer"> II (2015)</a> and
							<a href="https://cybersecurite.public.lu/dam-assets/fr/cyber3-bro-2018-def-fr.pdf" target="_blank" rel="noreferrer"> III (2018)</a>)
						</p>

						<p>
							Luxembourg’s fourth national strategy builds on the foundations of the three
							previous strategies. It comprises three strategic objectives, which each have
							several strategic priorities. Multiple concrete and measurable actions, which are
							set out in an internal monitoring table (available upon request from
							info@hcpn.etat.lu), are grouped under each priority.
						</p>

						<div className="row">
							<Collapsible
								className="col-md-4"
								trigger={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective I</h3>

										<i className="fas fa-balance-scale-right"/>

										<p>Building trust in the digital world and protection of human rights online</p>
									</div>
								}
								triggerWhenOpen={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective I</h3>
									</div>
								}>
								<div className="row StrategieNational-Collapsible-content">
									<div className="col-md-12">
										<p>
											<i>
												The first obligation of the State is to protect
												its citizens and guarantee their
												fundamental rights and freedoms. In a society that
												is permanently connected to the
												Internet and multi-dependent on computer networks
												and systems, there are many risks
												and threats to living together and to the rights
												of each individual. The protection
												of this civic space in line with all human rights
												– civil, political, economic,
												social, cultural, and environmental – is the
												first objective of this strategy.
											</i>
										</p>

										<ul>
											<li>I.1 Protection of human rights online</li>
											<li>I.2 Protection of children and young people’s rights</li>
											<li>I.3 Safe Digital Inclusion</li>
											<li>I.4 Cybersecurity education and vocational training</li>
											<li>I.5 Pen-testing, bug bounties and responsible
											disclosure of vulnerabilities</li>
											<li>I.6 Combating cybercrime</li>
											<li>I.7 Secure democratic and civic participation</li>
										</ul>
									</div>
								</div>
							</Collapsible>

							<Collapsible
								className="col-md-4"
								trigger={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective II</h3>

										<i className="fas fa-balance-scale-right"/>

										<p>Strengthening the security and resilience of digital
										infrastructures in Luxembourg</p>
									</div>
								}
								triggerWhenOpen={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective II</h3>
									</div>
								}>
								<div className="row StrategieNational-Collapsible-content">
									<div className="col-md-12">
										<p>
											<i>
												The availability, integrity and confidentiality of
												data are the objectives of
												cybersecurity: faced with the numerous cyber incidents
												observed daily, as well
												as the risks and threats observed on the horizon, the
												Government has chosen to
												prioritise strengthening the security and resilience
												of digital infrastructures
												as a second strategic objective.
											</i>
										</p>

										<ul>
											<li>II.1 Strengthening the security and resilience of
											the State’s digital
											processes and information and communication systems</li>
											<li>II.2 Secure and controlled use of the public cloud
											at state level</li>
											<li>II.3 Ensuring digital sovereignty</li>
											<li>II.4 Continuous improvement of incident
											detection and management</li>
											<li>II.5 Cyber situational analysis (cyber
												weather) and cyber intelligence</li>
											<li>II.6 Risk assessment and management</li>
											<li>II.7 Critical infrastructure protection</li>
											<li>II.8 Security of the networks and
											information systems of essential service
											operators</li>
											<li>II.9 Cybersecurity in the health sector</li>
											<li>II.10 Improvement of national and
											international cyber crisis management
											processes and procedures</li>
											<li>II.11 European obligations on the
											security of telecommunications networks
											and services</li>
											<li>II.12 Supply chain security </li>
											<li>II.13 Securing e-mail communications at national level</li>
											<li>
												II.14 Securing communications and data
												through the use of quantum technologies
											</li>
											<li>II.15 Operationalisation of the national
											cyber defence strategy</li>
										</ul>
									</div>
								</div>
							</Collapsible>

							<Collapsible
								className="col-md-4"
								trigger={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective III</h3>

										<i className="fas fa-balance-scale-right"/>

										<p>Development of a reliable, sustainable
										and secure digital economy</p>
									</div>
								}
								triggerWhenOpen={
									<div className={"StrategieNational-Collapsible-header"}>
										<h3>Objective III</h3>
									</div>
								}>
								<div className="row StrategieNational-Collapsible-content">
									<div className="col-md-12">
										<p>
											<i>
												“Openness, dynamism and reliability”: the
												Luxembourg Government’s strategy
												of economic dynamism and diversification is
												largely based on the continuous
												development of a high-performance digital economy.
												Cybersecurity is essential
												for the smooth functioning of the relations,
												transactions, services and other
												interactions that underpin the digital economy.
											</i>
										</p>

										<ul>
											<ul>
												<li>III.1 Federation of the Luxembourg
												Cybersecurity Ecosystem</li>
												<li>III.2 Federation of the Luxembourg
												Cybersecurity Research Ecosystem</li>
												<li>III.3 Development of certification,
												testing and standardisation methodologies</li>
												<li>III.4 Creation of the first cybersecurity
												data space in Europe</li>
												<li>III.5 Capitalisation on the Cybersecurity
												Competence Centre (C3)</li>
												<li>III.6 Consolidation of the European digital
												cluster in Luxembourg</li>
												<li>III.7 Capacity building at national and
												international level</li>
												<li>III.8 Intensifying partnerships with industry,
												research and civil society</li>
											</ul>
										</ul>
									</div>
								</div>
							</Collapsible>
						</div>

						<p>
							To achieve these 3 objectives, Luxembourg relies on a strong national cybersecurity
							governance framework and proven preparedness, response and recovery measures.
						</p>

						<p>
							The growth of the digital market goes hand in hand with strong increase in
							the need for trainers and cybersecurity professionals. In an effort to engage
							cybersecurity experts in the future, training curricula will be updated to further
							include the topic of cybersecurity.
						</p>

						<p>&nbsp;</p>

						<button
							ref={this.part4}
							className={"StrategieNational-read-strategy"}
							onClick={() => window.open("pdf/National-Cybersecurity-Strategy-IV.pdf")}
						>
							Read the National Cybersecurity Strategy IV here
						</button>

						<p>&nbsp;</p>
					</div>
				</div>
			</div>
		);
	}
}
