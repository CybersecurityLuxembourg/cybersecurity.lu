import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="Footer">
				<div className="Footer-content">
					<div className="row">
						<div className="col-md-3">
							<h3>Partenaires</h3>
							<div>
								<a
									href="https://hcpn.gouvernement.lu/fr.html"
									target="_blank"
									title="HCPN"
									className="text-capitalize">
									HCPN
								</a>
							</div>
							<div>
								<a
									href="https://securitymadein.lu/"
									target="_blank"
									title="SECURITYMADEIN.LU GIE"
									className="text-capitalize">
									SECURITYMADEIN.LU GIE
								</a>
							</div>
							<div>
								<a
									href="https://www.luxinnovation.lu/"
									target="_blank"
									title="LUXINNOVATION GIE"
									className="text-capitalize">
									LUXINNOVATION GIE
								</a>
							</div>
						</div>
						<div className="col-md-3 Footer-contact">
							<h3>Contact</h3>
							<div>SECURITY MADE IN LËTZEBUERG G.I.E.</div>
							<div>16, BOULEVARD D’AVRANCHES L-1160 LUXEMBOURG</div>
							<div>(+352) 274 00 98 601 - CYBERLUX@SECURITYMADEIN.LU</div>
						</div>
						<div className="col-md-3">
							<h3>Menu</h3>
							<div>
								<a
									href="https://www.circl.lu/"
									target="_blank"
									title="About"
									className="text-capitalize">
									<Link to="/ecosystem">Ecosystem</Link>
								</a>
							</div>
							<div>
								<a
									href="https://www.cases.lu/"
									target="_blank"
									title="Jobs"
									className="text-capitalize">
									<Link to="/news">News</Link>
								</a>
							</div>
							<div>
								<a
									href="https://www.c-3.lu/"
									target="_blank"
									title="Legal"
									className="text-capitalize">
									<Link to="/calendar">Calendar</Link>
								</a>
							</div>
							<div>
								<a
									href="https://www.c-3.lu/"
									target="_blank"
									title="Legal"
									className="text-capitalize">
									<Link to="/jobs">Job market</Link>
								</a>
							</div>
							<div>
								<a
									href="https://www.c-3.lu/"
									target="_blank"
									title="Legal"
									className="text-capitalize">
									<Link to="/about">About</Link>
								</a>
							</div>
						</div>
						<div className="col-md-3">
							<h3>Network</h3>
							<div className="Footer-network">
								<a
									href="https://twitter.com/CybersecLux"
									target="_blank"
									title="Twitter CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-twitter Footer-network"/>
								</a>
								<a
									href="https://www.linkedin.com/company/cybersecurity-luxembourg/"
									target="_blank"
									title="LinkedIn CYBERLUX"
									className="text-capitalize">
									<i className="fab fa-linkedin-in Footer-network"/>
								</a>
								<a
									href="https://github.com/CybersecLux/"
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
