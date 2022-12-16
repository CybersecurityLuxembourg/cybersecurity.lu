import React from "react";
import "./PageInitiative.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import { getApiURL } from "../../utils/env.jsx";

export default class PageInitiative extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageInitiative page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/initiative">THE INITIATIVE</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>A FOREWORD FROM MR FRANZ FAYOT, MINISTER OF THE ECONOMY</h1>
					</div>
				</div>

				<div className="row">
					<div className="col-md-2"/>
					<div className="col-md-8">
						<div className="PageInitiative-quote">
							{// eslint-disable-next-line
							}<p>In order to achieve an inclusive, flourishing and trusted digital economy, the Ministry of the Economy especially promotes best practices among businesses and the implementation of informed governance via a collaborative risk management approach.</p>
							<p>- Mr Franz Fayot, Minister of the Economy</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<img className="PageInitiative-pm-picture" src="/img/franz-fayot-500.jpg" align="left"/>
						{// eslint-disable-next-line
						}<p>We are on the eve of creating ultra-connected human societies, based increasingly on mobile technologies, the growing use of cloud computing solutions and the continued development of the Internet of Things. While welcoming new opportunities, we also expose ourselves to multiple new risks, with an augmented dependency on the availability and reliability of data.</p>
						{// eslint-disable-next-line
						}<p>This phenomenon highlights the increasingly transversal responsibility of policy and decision-makers and the growing importance of businesses and citizens called to take part in shaping tomorrows society. The digital transition requests each of us to grow into a more accountable and informed user of technology.</p>
						{// eslint-disable-next-line
						}<p>Europe calls for the creation of sovereign products and services that guarantee these values. Luxembourg, with its IT and cybersecurity ecosystem, is answering this call in multiple ways.</p>
						{// eslint-disable-next-line
						}<p>New challenges, requesting innovative cybersecurity services and products lie ahead of us, while we continue to consolidate security in existing networks and systems. Cooperation, national and international, will play an ever-important role.</p>
						{// eslint-disable-next-line
						}<p>In order to achieve an inclusive, flourishing and trusted digital economy, the Ministry of the Economy especially promotes best practices among businesses and the implementation of informed governance via a collaborative risk management approach.</p>
						{// eslint-disable-next-line
						}<p>I am pleased to endorse the mapping 2020 of the national cybersecurity ecosystem. It is another proof of the success of continuous cooperation taking place at the level of our partners in education and research, the public & private partnerships, the authorities and regulators, and of our local companies & start-ups.</p>
						{// eslint-disable-next-line
						}<p>It is their expertise and their commitment, embedded in the national cybersecurity strategy coordinated by the Interministerial coordination committee for cyber prevention and cybersecurity, that creates the fabric of the trusted cybersecurity ecosystem we proud ourselves with in Luxembourg.</p>
						<p><b>Mr Franz Fayot</b></p>
						<p><b>Minister of the Economy</b></p>
					</div>
				</div>

				<div className="row">
					<div clasName="col-md-12">
						<h1>The national cybersecurity portal</h1>

						<h2>
							Securing cyberspace at all levels to support the digital
							transformation that characterises our economy and society
						</h2>

						<p>
							When it comes to cybersecurity, CYBERSECURITY Luxembourg
							portal, the national cybersecurity portal, is the central
							place to go for all the necessary information (from the national
							cybersecurity strategy to the latest news from the entities that
							make up the cybersecurity ecosystem), all relevant actors,
							services & products. The portal has also been developed with
							the aim of fostering networking, collaboration and innovation.
						</p>

						<p>
							The national cybersecurity portal serves a twofold purpose:
						</p>

						<ul>
							<li>
								Being the entry door to cybersecurity
								services/products/information made available for any
								entities/users having cybersecurity needs
							</li>
							<li>
								Fostering and empowering the national cybersecurity
								ecosystem within Luxembourg and abroad: connecting
								entities, creating and developing synergies
							</li>
						</ul>

						<h2>Empowering the cybersecurity ecosystem</h2>

						<p>
							By bringing together all cybersecurity actors, the
							portal aims to strengthen the links between the actors
							of the Luxembourg cybersecurity ecosystem in order to
							reinforce its relevance and impact and to make it more
							visible and available at national, <a
								href="https://tools.bdi.fr/annu_craft/cybersecurity.html"
								rel="noreferrer"
								target="_blank">
								European
							</a> and
							international level.
						</p>

						<p>
							The promotion of the Luxembourg cybersecurity ecosystem
							is made through the national brand <b>“CYBERSECURITY Luxembourg”</b>,
							an integral part of
							the <a
								href="https://luxembourg.public.lu/en/toolbox.html"
								rel="noreferrer"
								target="_blank">
								toolbox
							</a>
							&nbsp;intended to enhance and
							structure the promotion of Luxembourg in the field of
							cybersecurity. Cybersecurity is a key component in the
							country’s efforts to promote all aspects of the digital
							transformation and develop its data-driven economy. Therefore,
							the initiative is part of the <a
								href="/strategy">
								national cybersecurity strategy
							</a>.
						</p>

						<p>
							Under the High Patronage of the <a
								href="https://meco.gouvernement.lu/en.html"
								rel="noreferrer"
								target="_blank">
								Ministry of the Economy
							</a>
							, <b>CYBERSECURITY Luxembourg</b> is led and driven
							by key national
							cybersecurity stakeholders that are <a
								href="https://hcpn.gouvernement.lu/fr.html"
								rel="noreferrer"
								target="_blank">
								HCNP
							</a>
							, High Commission for
							National Protection and <a
								href="https://lhc.lu/"
								rel="noreferrer"
								target="_blank">
								Luxembourg House of Cybersecurity
							</a>, the Cybersecurity
							Agency for the Luxembourg Economy and Municipalities, and
							actively supported by <a
								href="https://www.luxinnovation.lu/"
								rel="noreferrer"
								target="_blank">
								Luxinnovation
							</a>, the national agency for
							innovation and the promotion of Luxembourg’s expertise
							internationally.
						</p>

						<h2>What is the ecosystem like?</h2>

						<p>
							The market mapping gathers all 300+ entities (private,
								public and civil sectors) involved in cybersecurity.
							Based on the <a
								href={getApiURL() + "public/get_public_document/ECSO-cybersecurity-market-radar-brochure_20190911.pdf"}
								rel="noreferrer"
								target="_blank">
								ECSO Cybersecurity Market Radar
							</a> classification,
							the directory unveils an almost exhaustive range of cybersecurity
							solutions that cover the risk management supply chain, highlighting
							the existing expertise and competence amongst Luxembourg ecosystem
							and identifying the gaps and opportunities for improvement.
						</p>

						<p>
							The <a
								href="https://www.luxinnovation.lu/wp-content/uploads/sites/3/2019/10/luxembourg-cybersecurity-ecosystem_mapping-2019-1.pdf"
								rel="noreferrer"
								target="_blank">
								first mapping
							</a> was introduced in October 2019,
							a <a
								href="https://www.luxinnovation.lu/wp-content/uploads/sites/3/2020/12/2020-10-key-insigights-cybersecurity_final.pdf"
								rel="noreferrer"
								target="_blank">
								second mapping
							</a> was published in 2020.
						</p>

						<p>
							Currently, of the 300+ organisations in the ecosystem, a
							quarter have cybersecurity as their core business and more
							than 20% are start-ups, highlighting the country&apos;s great potential
							for innovation in cybersecurity.
						</p>

						<p>
							Cybersecurity has been integrated as a focus area among non-IT
							traditional businesses, making it a real asset to the Luxembourg economy.
						</p>
					</div>

					<div className="col-md-2"/>
					<div className="col-md-8 row-spaced">
						{// eslint-disable-next-line
						}<Collapsible trigger={<p>Read more about the methodology used for the ecosystem mapping</p>}>
							<div className="row">
								<div className="col-md-12">
									{// eslint-disable-next-line
									}<p>To assess and analyse the companies and organisations that make up the ecosystem, the following criteria are considered:</p>
									<ul>
										<li>the company or organisation should have a legal entity in Luxembourg,</li>
										<li>it should provide at least one cybersecurity service or solution.</li>
									</ul>
								</div>
								<div className="col-md-12">
									<h3>A 3-step process</h3>
								</div>
								<div className="col-md-12">
									<img
										src="img/3-step-process.png"
									/>
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}<b>1. Data was gathered using different sources from the Market Intelligence service of Luxinnovation (LXI-Market Intelligence). The used data sources are as follows:</b>
								</div>
								<div className="col-md-12">
									<img
										src="img/market-intelligence-data.png"
									/>
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}<b>2. Each company was then reviewed and categorised by Luxembourg House of Cybersecurity based on the <a target="_blank" rel="noreferrer" href={getApiURL() + "public/get_public_document/ECSO-cybersecurity-market-radar-brochure_20190911.pdf"}>ECSO Cybersecurity Market Radar</a>.</b>
								</div>
								<div className="col-md-12">
									<img
										src="img/cybersecurity-ecso-taxonomy.png"
									/>
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}As part of this step, Luxembourg House of Cybersecurity identified the members of the ecosystem whose core business is related to cybersecurity and categorised the solutions provided by each member of the ecosystem.
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}<b>3. Finally, LXI-Market Intelligence and Luxembourg House of Cybersecurity analysed the ecosystem.</b>
								</div>
							</div>
						</Collapsible>
					</div>
				</div>
			</div>
		);
	}
}
