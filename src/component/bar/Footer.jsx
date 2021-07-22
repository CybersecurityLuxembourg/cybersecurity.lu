import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { getEcosystemAppURL, getPrivateAppURL } from "../../utils/env.jsx";

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

							<div className="Footer-patronage">
								Under the High Patronage of the <br/><b>Ministry of the Economy</b>
							</div>
							<div className="Footer-title">KEY PARTNERS</div>
							<div className="Footer-alinea">
								<a
									href="https://hcpn.gouvernement.lu/en.html"
									rel="noreferrer"
									target="_blank"
									title="HCPN">
									High Commission for National Protection
								</a>
							</div>
							<br/>
							<div className="Footer-alinea">
								<a
									href="https://securitymadein.lu/"
									rel="noreferrer"
									target="_blank"
									title="SECURITYMADEIN.LU GIE"
									className="text-capitalize">
									SECURITYMADEIN.LU
								</a>
							</div>
							<br/>
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
						<div className="col-md-1"/>
						<div className="col-md-2">
							<div className="Footer-title">MENU</div>
							<div>
								<Link to="/"><b>Home</b></Link>
							</div>
							<div>
								<Link to="/about"><b>About</b></Link>
							</div>
							<br/>
							<div>
								<Link to="/news">What&apos;s up?</Link>
							</div>
							<div>
								<Link to="/calendar">Where to meet?</Link>
							</div>
							<div>
								<a
									href={getEcosystemAppURL()}
									rel="noreferrer"
									title="Ecosystem">
									Ecosystem
								</a>
							</div>
							<br/>
							<div>
								<a
									href={getPrivateAppURL()}
									rel="noreferrer"
									target="_blank"
									title="My CYBERLUX">
									My CYBERLUX
								</a>
							</div>
						</div>
						<div className="col-md-4 Footer-contact">
							<div className="Footer-title">CONTACT</div>

							<div>SECURITYMADEIN.LU g.i.e.</div>
							<div>16, boulevard d&#39;Avranches</div>
							<div>L-1160 Luxembourg</div>
							<br/>
							<div>(+352) 274 00 98 601</div>
							<div>
								<a href="mailto:info@cybersecurity-luxembourg.com">info@cybersecurity-luxembourg.com</a>
							</div>
							<br/>
							<div>Copyright © SECURITYMADEIN.LU g.i.e 2021</div>
							<div>
								<a
									href={"/pdf/2021-07-08 - Terms of Use CYBERLUX.pdf"}
									rel="noreferrer"
									target="_blank"
									title="Terms of use"
									className="text-capitalize">
									Terms of use
								</a>
							</div>
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
									href="https://github.com/CybersecLux/"
									rel="noreferrer"
									target="_blank"
									title="GitHub CyberLux"
									className="text-capitalize">
									<i className="fab fa-github-alt Footer-network"/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
