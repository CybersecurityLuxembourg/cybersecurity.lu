import React from "react";
import "./PageAbout.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

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
							<Breadcrumb.Item><Link to="/about">About</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>A FOREWORD FROM MR FRANZ FAYOT, MINISTER OF THE ECONOMY</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p><b>A trusted cybersecurity ecosystem for a flourishing digital economy</b></p>
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
						<h1>A DEDICATED BRAND AND PLATFORM</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p>Under the high patronage of the Ministry of the Economy, the <b>CYBERSECURITY LUXEMBOURG</b> initiative was launched under Minister Étienne Schneider to foster and enhance public-private cooperation in cybersecurity aligned with and integrated into the national cybersecurity strategy.</p>
						{// eslint-disable-next-line
						}<p><b>CYBERSECURITY LUXEMBOURG</b> is led and driven by key national cybersecurity stakeholders: <b>HCPN</b> and <b>SECURITYMADEIN.LU</b>, and actively supported, by the national agency for innovation and the promotion of Luxembourg’s expertise internationally: <b>Luxinnovation</b>.</p>
						{// eslint-disable-next-line
						}<p>This national brand was created to foster, promote and give common visibility to the cybersecurity ecosystem. It can be used by all members and stakeholders of the cybersecurity ecosystem to promote their events or campaigns, in compliance with the graphic guidelines.</p>
					</div>
				</div>

				<div className="row row-spaced justify-content-md-center PageAbout-our-teams">
					<div className="col-md-12">
						<h1>THE DRIVING SEAT</h1>
					</div>
					<div className="col-md-3">
						<h2>HCPN</h2>
						<div className={"centered"}>
							<a
								href="https://hcpn.gouvernement.lu/fr.html"
								rel="noreferrer"
								target="_blank"
								title="About"
								className="text-capitalize">
								<img
									src="img/hcpn-logo.png"
								/>
							</a>
						</div>
						<div>
							{// eslint-disable-next-line
							}<p>As coordinator of the national cybersecurity strategy, HCPN drives the initiative by integrating it into the national cybersecurity strategy.</p>
						</div>
						<a
							href="https://hcpn.gouvernement.lu/fr.html"
							rel="noreferrer"
							target="_blank"
							title="HCPN"
							className="text-capitalize">
							Visit website
						</a>
					</div>
					<div className="col-md-3">
						<h2>LUXINNOVATION</h2>
						<div className={"centered"}>
							<a
								href="https://www.luxinnovation.lu/"
								rel="noreferrer"
								target="_blank"
								title="HCPN"
								className="text-capitalize">
								<img
									src="img/luxinnovation-logo.jpg"
								/>
							</a>
						</div>
						<div>
							{// eslint-disable-next-line
							}<p>Luxinnovation brings into the project its expertise in terms of market intelligence and ecosystem promotion.</p>
						</div>
						<a
							href="https://www.luxinnovation.lu/"
							rel="noreferrer"
							target="_blank"
							title="About"
							className="text-capitalize">
							Visit website
						</a>
					</div>
					<div className="col-md-3">
						<h2>SECURITYMADEIN.LU</h2>
						<div className={"centered"}>
							<a
								href="https://securitymadein.lu/"
								rel="noreferrer"
								target="_blank"
								title="LUXXINOVATION"
								className="text-capitalize">
								<img
									src="img/secin-logo.png"
								/>
							</a>
						</div>
						<div>
							{// eslint-disable-next-line
							}<p>The cybersecurity agency for the Luxembourg economy and municipalities will be in charge of the overall coordination of the initiative.</p>
						</div>
						<a
							className="right-button text-capitalize"
							href="https://securitymadein.lu/"
							rel="noreferrer"
							target="_blank"
							title="SECURITYMADEIN.LU">
							Visit website
						</a>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>WHY SHOULD YOU JOIN THE ECOSYSTEM?</h1>
					</div>

					<div className="col-md-12">
						{// eslint-disable-next-line
						}<p>Cybersecurity is key to successfully steering the digital transformation of our economy – and your business. The last 20 years, the Grand-Duchy has invested substantially in and has created a competitive ecosystem for cybersecurity.</p>
						{// eslint-disable-next-line
						}<p><b>SECURITYMADEIN.LU</b>, in close collaboration with Luxinnovation, has developed a coordination framework to promote the Luxembourg cybersecurity ecosystem, making sure that, throughout the year, you will obtain the visibility you need and thus be able to optimise business opportunities.</p>
						{// eslint-disable-next-line
						}<p>Our online platform will provide information about public and private organisations, their services, activities, news and events. We would be delighted for you to be part of this initiative!</p>
						{// eslint-disable-next-line
						}<p>Being part of the ecosystem means you are well informed and your voice can be heard throughout the ecosystem. Do not forget: business is all about making connections, proper cybersecurity is a guarantee for a continuous and sustainable IT business, without which business itself is now inconceivable.</p>
						{// eslint-disable-next-line
						}<p><b>Are you a Luxembourg-based company with cybersecurity services?</b></p>
						{// eslint-disable-next-line
						}<p><b>Then, you should join the CYBERSECURITY LUXEMBOURG ecosystem and benefit from business and visibility opportunities in the country, and abroad!</b></p>
						{// eslint-disable-next-line
						}<p><b>You can register HERE</b></p>
					</div>
				</div>
			</div>
		);
	}
}
