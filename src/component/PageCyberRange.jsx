import React from "react";
import "./PageCyberRange.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import ShadowBox from "./box/ShadowBox.jsx";

export default class PageCyberRange extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageCyberRange page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/cyberrange">CYBER RANGE</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Cyber Range</h1>
					</div>

					<div className="col-md-12 row-spaced">
						The Cyber Defence Strategy of the Grand Duchy of Luxembourg aims to
						further develop the country’s capabilities through a number of
						initiatives to upskill the workforce and promote
						greater national and international cooperation. One initiative
						is the Luxembourg Cyber Range platform,
						a virtual training environment for national and international
						cybersecurity professionals enhancing
						technical skills as well as crisis management capabilities at
						technical and leadership levels.
					</div>

					<div className="col-md-1"/>
					<div className="col-md-4 row-spaced">
						<div className="PageCyberRange-img-wrapper">
							<img
								src={"img/cyberrange.png"}
								alt={"SECURITYMADEIN.LU"}
							/>
						</div>
					</div>
					<div className="col-md-2"/>
					<div className="col-md-4 row-spaced">
						<ShadowBox
							onClick={() => window.open("https://cyber-range.lu")}
							title={"Go to Cyber Range Luxembourg website"}
							icon={"fas fa-shield-alt"}
						/>
					</div>
					<div className="col-md-1"/>

					<div className="col-md-6">
						<h2>Target Audience</h2>

						<p> The main target audience of the Luxembourg Cyber Range includes:</p>
						<ul>
							<li>national authorities;</li>
							<li>national governmental entities;</li>
							<li>national cybersecurity actors;</li>
							<li>national education and research entities;</li>
							<li>national critical infrastructure operators and
								operators of essential services;</li>
							<li>NATO allies;</li>
							<li>EU partner nations;</li>
							<li>international institutions linked to the defence
								sector (EU Agencies, NATO agencies, Centre of
								excellences);
							</li>
							<li>humanitarian organisations.</li>
						</ul>
					</div>

					<div className="col-md-6">
						<h2>Contact</h2>

						<div id="contact-box" className="centered">
							<b>Direction de la défense</b>

							<address>
								6, rue de l&apos;ancien Athénée<br/>
								L-1144 Luxembourg<br/>
								Luxembourg
							</address>

							(+352) 247-82800<br/>
							<a href="mailto:cyberrange@mae.etat.lu ">cyberrange@mae.etat.lu </a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
