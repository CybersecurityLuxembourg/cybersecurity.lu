import React from "react";
import "./Menu.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";
import SearchField from "../form/SearchField.jsx";

export default class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showFlyingMenu: false,
		};
	}

	componentDidMount() {
		document.querySelector("#root").addEventListener("scroll", () => {
			const currentScrollPos = document.getElementById("root").scrollTop;

			if (currentScrollPos !== undefined && currentScrollPos !== 0) {
				if (currentScrollPos > 300 && !this.state.showFlyingMenu) {
					this.setState({ showFlyingMenu: true });
				} else if (currentScrollPos < 300) {
					this.setState({ showFlyingMenu: false });
				}
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	getNavBar() {
		return <Nav className="mr-sm-2 ml-auto">
			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">What&apos;s up?</div>
						<div className="Menu-description">News and events</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/news">
						<div className="Menu-title">News</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/events">
						<div className="Menu-title">Upcoming events</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/ltac">
						<div className="Menu-title">Lëtz Talk About Cyber</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/newsletter">
						<div className="Menu-title">Newsletter</div>
					</Link>
				</NavDropdown.Item>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Ecosystem</div>
						<div className="Menu-description">View on the community</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/privatesector">
						<div className="Menu-title">Private sector</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/publicsector">
						<div className="Menu-title">Public sector</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/civilsociety">
						<div className="Menu-title">Civil society</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item>
					<Link to="/education">
						<div className="Menu-title">Education</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item>
					<Link to="/dashboard">
						<div className={"Menu-image"}>
							<img src="/img/network.svg" viewBox="0 0 20 20"/>
						</div>
						<div className={"Menu-image-text"}>
							<div className="Menu-title">Dashboard</div>
							<div className="Menu-description">Global view</div>
						</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/map">
						<div className={"Menu-image"}>
							<img src="/img/luxembourg.png"/>
						</div>
						<div className={"Menu-image-text"}>
							<div className="Menu-title">Map</div>
							<div className="Menu-description">Geographic view</div>
						</div>
					</Link>
				</NavDropdown.Item>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Get involved</div>
						<div className="Menu-description">Enter the adventure</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/breakfast">
						<div className="Menu-title">CYBERSECURITY Breakfast</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/cyber4growth">
						<div className="Menu-title">CYBER4Growth</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/cyberrange">
						<div className="Menu-title">Cyber Range</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/challenge">
						<div className="Menu-title">Lëtz Cybersecurity Challenge</div>
					</Link>
				</NavDropdown.Item>
				<a
					className="dropdown-item"
					href="https://www.ecsc2022.eu/about-ecsc/open-ecsc-2022/"
					target="_blank"
					rel="noreferrer">
					<div className="Menu-title">openECSC 2022</div>
				</a>
			</NavDropdown>

			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">Resources</div>
						<div className="Menu-description">Cybersecurity materials</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/practices">
						<div className="Menu-title">Cyber awareness & best practices</div>
					</Link>
				</NavDropdown.Item>
				{/* <NavDropdown.Item>
					<Link to="/cve">
						<div className="Menu-title">Common Vulnerabilities & Exposures</div>
					</Link>
				</NavDropdown.Item> */}
				<NavDropdown.Item>
					<Link to="/frameworks">
						<div className="Menu-title">Legal frameworks</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/topic">
						<div className="Menu-title">Topic of the month</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/podcasts">
						<div className="Menu-title">Podcasts</div>
					</Link>
				</NavDropdown.Item>
			</NavDropdown>

			<Nav.Link className="Menu-link-grey">
				<Link to="/cybersecurityweek">
					<div className="Menu-title">CSWL</div>
					<div className="Menu-description">Cybersecurity Week</div>
				</Link>
			</Nav.Link>

			<Nav.Link className="Menu-link-grey">
				<Link to="/jobs">
					<div className="Menu-title">Cybersecurity jobs</div>
					<div className="Menu-description">Marketplace in Luxembourg</div>
				</Link>
			</Nav.Link>

			<Nav.Link className="Menu-link Menu-link-red">
				<Link to="/lhc">
					<div className="Menu-title">LHC</div>
					<div className="Menu-description">House of Cybersecurity</div>
				</Link>
			</Nav.Link>
		</Nav>;
	}

	render() {
		return (
			<div className={"Menu page max-sized-page"}>
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
						{this.getNavBar()}
					</Navbar.Collapse>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="Menu-top-right-about mr-sm-2 ml-auto">
							<SearchField/>
							<NavDropdown
								title={
									<div className="Menu-item">
										<div className="Menu-title">About</div>
										<div className="Menu-description">the national portal</div>
										<i className="fas fa-sort-down"/>
									</div>
								}
								id="basic-nav-dropdown">
								<NavDropdown.Item>
									<Link to="/initiative">
										<div className="Menu-title">The initiative</div>
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Link to="/whatsinit">
										<div className="Menu-title">What&apos;s in it for you?</div>
									</Link>
								</NavDropdown.Item>
								<NavDropdown.Item>
									<Link to="/strategy">
										<div className="Menu-title">The national strategy</div>
									</Link>
								</NavDropdown.Item>
							</NavDropdown>
							<a
								className="nav-link"
								href={getPrivateAppURL()}
								rel="noreferrer"
							>
								<div className="Menu-title">Private space</div>
								<div className="Menu-description">Login or register</div>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.showFlyingMenu
					&& <div className={"Menu-flying-menu-wrapper"}>
						<div className="Menu-flying-menu max-sized-page">
							<Link to="/">
								<img
									className="logo"
									src="/img/ecosystem-logo.jpg"
									alt="CYBERLUX Logo"
								/>
							</Link>
							<div className="navbar navbar-nav">
								{this.getNavBar()}
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}
