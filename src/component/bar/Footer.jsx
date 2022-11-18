import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-3">
							<div className="row">
								<div className="col-md-12">
									<div className="Footer-patronage">
										Under the High Patronage of the <br/><b>Ministry of the Economy</b>
									</div>
									<br/>
									<div className="Footer-title">KEY PARTNERS</div>
									<br/>
									<div className="Footer-alinea">
										<a
											href="https://hcpn.gouvernement.lu/en.html"
											rel="noreferrer"
											target="_blank"
											title="HCPN">
											High Commission for National Protection
										</a>
									</div>
									<div className="Footer-alinea">
										<a
											href="https://lhc.lu/"
											rel="noreferrer"
											target="_blank"
											title="Luxembourg House of Cybersecurity"
											className="text-capitalize">
											Luxembourg House of Cybersecurity
										</a>
									</div>
									<div className="Footer-alinea">
										<a
											href="https://www.luxinnovation.lu/"
											rel="noreferrer"
											target="_blank"
											title="LUXINNOVATION GIE"
											className="text-capitalize">
											Luxinnovation
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-5">
							<div className="Footer-title">MENU</div>

							<div className="row">
								<div className="col-md-4">
									<div>
										<Link to="/">
											Home
										</Link>
									</div>
									<br/>
									<div>
										<Link to="/whatsup">
											<b>What&apos;s up?</b>
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/news">
											News
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/events">
											Upcoming events
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/ltac">
											Lëtz Talk About Cyber
										</Link>
									</div>
									{/* <div>
										<Link to="/topic">
											Topic of the month
										</Link>
									</div> */}
									<div className="Footer-alinea">
										<Link to="/newsletter">
											Newsletter
										</Link>
									</div>
									<br/>
									<div>
										<Link to="/ecosystem">
											<b>Ecosystem</b>
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/privatesector">
											Private sector
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/publicsector">
											Public sector
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/civilsociety">
											Civil society
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/education">
											Education
										</Link>
									</div>
									{/* <div className="Footer-alinea">
										<Link to="/education">
											Education
										</Link>
									</div> */}
									<div className="Footer-alinea">
										<Link to="/dashboard">
											Dashboard
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/map">
											Map
										</Link>
									</div>
								</div>

								<div className="col-md-4">
									<div>
										<Link to="/get_involved">
											<b>Get involved</b>
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/breakfast">
											CYBERSECURITY Breakfast
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/cyber4growth">
											CYBER4Growth
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/cyberrange">
											Cyber Range
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/challenge">
											Lëtz Cybersecurity Challenge
										</Link>
									</div>
									<div className="Footer-alinea">
										<a href="https://ecsc.eu/" target="_blank" rel="noreferrer">
											openECSC 2022
										</a>
									</div>
									<br/>
									<div>
										<Link to="/resources">
											<b>Resources</b>
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/practices">
											Best practices
										</Link>
									</div>
									{/* <div className="Footer-alinea">
										<Link to="/cyber4growth">
											CVE
										</Link>
									</div> */}
									<div className="Footer-alinea">
										<Link to="/frameworks">
											Legal frameworks
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/podcasts">
											Podcasts
										</Link>
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<Link to="/about">
											<b>About</b>
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/initiative">
											The initiative
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/whatsinit">
											What&apos;s in it for you?
										</Link>
									</div>
									<div className="Footer-alinea">
										<Link to="/strategy">
											The national strategy
										</Link>
									</div>
									<br/>
									<div>
										<Link to="/cybersecurityweek">
											<b>CSWL</b>
										</Link>
									</div>
									<br/>
									<div>
										<Link to="/jobs">
											<b>Cybersecurity jobs</b>
										</Link>
									</div>
									<br/>
									<div>
										<a href={getPrivateAppURL()}>
											<b>Private space</b>
										</a>
									</div>
								</div>
							</div>
						</div><br/>
						<br/><br/>
						<div className="col-md-2 Footer-contact">
							<div className="Footer-title">CONTACT</div>
							<br/>
							<div>Luxembourg House of Cybersecurity</div>
							<div>122 rue Adolphe Fischer</div>
							<div>L-1521 Luxembourg</div>
							<br/>
							<div>(+352) 274 00 98 601</div>
							<div>
								<a href="mailto:info@cybersecurity-luxembourg.com">info@cybersecurity-luxembourg.com</a>
							</div>
							<br/>
							<div>Copyright © <br/>Luxembourg House of Cybersecurity <br/> 2021</div>
						</div>
						<div className="col-md-2">
							<div className="Footer-network">
								<a
									href="https://twitter.com/cyberluxembourg"
									rel="noreferrer"
									target="_blank"
									title="Twitter CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/cybersecurity-luxembourg/"
									rel="noreferrer"
									target="_blank"
									title="LinkedIn CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
								<a
									href="https://github.com/CybersecurityLuxembourg/"
									rel="noreferrer"
									target="_blank"
									title="GitHub CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-github-alt Footer-network"/>
								</a>
							</div>
							<div className="Footer-documentation-and-terms">
								{/* <a
									href="/pdf/Documentation of the CYBERSECURITY Luxembourg website_release_v1.4.pdf"
									rel="noreferrer"
									target="_blank"
									title="How to use the portal?"
									className="text-capitalize">
									<i className="fas fa-book"/> How to use the portal?
								</a> */}
								<a
									href={"/pdf/Terms of Use CYBERLUX.pdf"}
									rel="noreferrer"
									target="_blank"
									title="Terms of use"
									className="text-capitalize">
									<i className="fas fa-gavel"/> Terms of use
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
