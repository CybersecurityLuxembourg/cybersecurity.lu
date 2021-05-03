import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { getPrivateAppURL, getEcosystemAppURL } from "../../utils/env.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"page max-sized-page"}>
				<Navbar expand="lg">
					<Navbar.Brand>
						<Link to="/">
							<img
								className={"Menu-logo"}
								src="/img/ecosystem-logo.jpg"
								alt="CYBERLUX Logo"
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-sm-2 ml-auto">
							<Nav.Link>
								<Link to="/">
									<div className="Menu-title">Home</div>
									<div className="Menu-description">Our main lines</div>
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/news">
									<div className="Menu-title">News</div>
									<div className="Menu-description">Keep an eye out</div>
								</Link>
							</Nav.Link>
							<Nav.Link>
								<Link to="/calendar">
									<div className="Menu-title">Calendar</div>
									<div className="Menu-description">Cybersecurity events</div>
								</Link>
							</Nav.Link>
							<a
								className="nav-link"
								href={getEcosystemAppURL()}
								rel="noreferrer"
							>
								<div className="Menu-title">Ecosystem</div>
								<div className="Menu-description">View on the community</div>
							</a>
							<a
								className="nav-link"
								href={getPrivateAppURL()}
								rel="noreferrer"
							>
								<div className="Menu-title">Login</div>
								<div className="Menu-description">Or subscribe</div>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
