import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";
import ButtonRegister from "./form/ButtonRegister.jsx";

export default class PageAbout extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageAbout page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/about">ABOUT</Link></Breadcrumb.Item>
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
						<div className="PageAbout-quote">
							{// eslint-disable-next-line
							}<p>In order to achieve an inclusive, flourishing and trusted digital economy, the Ministry of the Economy especially promotes best practices among businesses and the implementation of informed governance via a collaborative risk management approach.</p>
							<p>- Mr Franz Fayot, Minister of the Economy</p>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<img className="PageAbout-pm-picture" src="/img/franz-fayot-500.jpg" align="left"/>
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
					<div className="col-md-12">
						{// eslint-disable-next-line
						}<h1>CYBERSECURITY Luxembourg, a trusted cybersecurity ecosystem for a flourishing digital economy</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p><b>CYBERSECURITY Luxembourg</b> is an initiative gathering <b>300+ public-private players</b> in the field of cybersecurity with the aim to develop national cooperation, foster innovation and further develop the cybersecurity market in Luxembourg. The initiative is part of the national cybersecurity strategy.</p>
						{// eslint-disable-next-line
						}<p>Under the High Patronage of the <a target="_blank" rel="noreferrer" href="https://meco.gouvernement.lu/en.html">Ministry of the Economy</a>, <b>CYBERSECURITY Luxembourg</b> is led and driven by key national cybersecurity stakeholders that are <a target="_blank" rel="noreferrer" href="https://hcpn.gouvernement.lu/fr.html">HCNP</a>, High Commission for National Protection and <a target="_blank" rel="noreferrer" href="https://securitymadein.lu/">SECURITYMADEIN.LU</a>, the cybersecurity agency for the Luxembourg economy and municipalities, and actively supported by <a target="_blank" rel="noreferrer" href="https://www.luxinnovation.lu/">Luxinnovation</a>, the national agency for innovation and the promotion of Luxembourg’s expertise internationally.</p>
						{// eslint-disable-next-line
						}<p>The objective of such an initiative is to federate the Luxembourg cybersecurity ecosystem and promote it through the national brand “<b>CYBERSECURITY Luxembourg</b>”, an integral part of the <a target="_blank" rel="noreferrer" href="https://luxembourg.public.lu/en/toolbox.html">toolbox</a> intended to enhance the image and structure the promotion of Luxembourg in the field of cybersecurity. Cybersecurity is a key component in the country’s efforts to promote all aspects of the digital transformation and develop its data-driven economy.</p>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						{// eslint-disable-next-line
						}<h1>A comprehensive web portal to boost the cybersecurity community</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p>The release of the interactive <b>CYBERSECURITY Luxembourg</b> ecosystem mapping kicks off this web portal, meant to be a comprehensive, central and neutral information gathering for the cybersecurity community.</p>
						{// eslint-disable-next-line
						}<p>The market mapping gathers all 300+ companies providing cybersecurity services and products as well as the public entities in charge of the regulations that apply to the sector and civil society associations active in cybersecurity. Categorised on the basis of the <a target="_blank" rel="noreferrer" href="http://www.ecs-org.eu/documents/uploads/ecso-cybersecurity-market-radar-brochure.pdf">ECSO Cybersecurity Market Radar</a>, the directory provides an almost exhaustive range of cybersecurity solutions that cover the risk management supply, highlighting the existing expertise and knowledge and identifying gaps and opportunities for improvement.</p>
						{// eslint-disable-next-line
						}<p>While the first mapping has been introduced in October 2019, there are currently one-quarter of the 300+ companies within the ecosystem that have cybersecurity as core business. Other companies offer services and solutions beyond cybersecurity. Thus, cybersecurity has been integrated as a focus area (i.e. insurance providing dedicated solutions for cybersecurity) among non-IT traditional businesses, which makes it the real strength of the Luxembourg ecosystem. The many start-ups included in the mapping show the great innovation potential existing in the country.</p>
						{// eslint-disable-next-line
						}<p>The market mapping will not only promote the national ecosystem among Luxembourg businesses but also at the <a target="_blank" rel="noreferrer" href="https://tools.bdi.fr/annu_craft/cybersecurity.html">European level</a>.</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						{// eslint-disable-next-line
						}<h1>Join the CYBERSECURITY Luxembourg ecosystem!</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p><b>Are you a Luxembourg-based company with cybersecurity services?</b></p>
						{// eslint-disable-next-line
						}<p>Feel free to join the CYBERSECURITY Luxembourg ecosystem and benefit from business and visibility opportunities throughout the country, and abroad!</p>
						<ButtonRegister/>
					</div>
					<div className="col-md-2"/>
					<div className="col-md-8">
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
									}<b>2. Each company was then reviewed and categorised by SECURITYMADEIN.LU based on the <a target="_blank" rel="noreferrer" href="http://www.ecs-org.eu/documents/uploads/ecso-cybersecurity-market-radar-brochure.pdf">ECSO Cybersecurity Market Radar</a>.</b>
								</div>
								<div className="col-md-12">
									<img
										src="img/cybersecurity-ecso-taxonomy.png"
									/>
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}As part of this step, SECURITYMADEIN.LU identified the members of the ecosystem whose core business is related to cybersecurity and categorised the solutions provided by each member of the ecosystem.
								</div>
								<div className="col-md-12">
									{// eslint-disable-next-line
									}<b>3. Finally, LXI-Market Intelligence and SECURITYMADEIN.LU analysed the ecosystem.</b>
								</div>
							</div>
						</Collapsible>
					</div>
				</div>
			</div>
		);
	}
}
