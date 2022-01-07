import React from "react";
import "./Menu.css";
import { Carousel } from "react-responsive-carousel";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";
import SearchField from "../form/SearchField.jsx";
import Analytic from "../box/Analytic.jsx";

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
			<Nav.Link>
				<Link to="/strategy">
					<div className="Menu-title">Strategy</div>
					<div className="Menu-description">National commitment</div>
				</Link>
			</Nav.Link>
			<NavDropdown
				title={
					<div className="Menu-item">
						<div className="Menu-title">What&apos;s up?</div>
						<div className="Menu-description">News, events and jobs</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/news">
						<div className="Menu-title">News</div>
						<div className="Menu-description">Latest headlines</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/calendar">
						<div className="Menu-title">Events</div>
						<div className="Menu-description">Check out the calendar</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/marketplace">
						<div className="Menu-title">Jobs</div>
						<div className="Menu-description">Cybersecurity marketplace</div>
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
						<div className="Menu-description">Solution and service providers</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/publicsector">
						<div className="Menu-title">Public sector</div>
						<div className="Menu-description">Authorities and regulators</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/civilsociety">
						<div className="Menu-title">Civil society</div>
						<div className="Menu-description">Collective strengths</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item>
					<Link to="/education">
						<div className="Menu-title">Education</div>
						<div className="Menu-description">Program and courses</div>
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
						<div className="Menu-title">Our programs</div>
						<div className="Menu-description">Forum, startup and co</div>
						<i className="fas fa-sort-down"/>
					</div>
				}
				id="basic-nav-dropdown">
				<NavDropdown.Item>
					<Link to="/cyber4growth">
						<div className="Menu-title">Cyber4Growth</div>
						<div className="Menu-description">Startup accelerator</div>
					</Link>
				</NavDropdown.Item>
				<NavDropdown.Item>
					<Link to="/cybersecurityweek">
						<div className="Menu-title">CSWL 2022</div>
						<div className="Menu-description">Cybersecurity Week Luxembourg</div>
					</Link>
				</NavDropdown.Item>
			</NavDropdown>
			<Nav.Link>
				<Link to="/newsletter">
					<div className="Menu-title"><i className="fas fa-envelope-open-text"/> Newsletter</div>
					<div className="Menu-description">Our monthly selection</div>
				</Link>
			</Nav.Link>
			<a
				className="nav-link"
				href={getPrivateAppURL()}
				rel="noreferrer"
			>
				<div className="Menu-title">My CYBERLUX</div>
				<div className="Menu-description">Login or register</div>
			</a>
		</Nav>;
	}

	getArticleCategoryId(value) {
		if (this.props.analytics !== null
			&& this.props.analytics !== undefined
			&& this.props.analytics.taxonomy_values !== undefined) {
			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ARTICLE CATEGORY")
				.filter((v) => v.name === value);

			if (taxonomyValues.length === 0) {
				return "";
			}

			return taxonomyValues[0].id;
		}

		return "";
	}

	render() {
		return (
			<div className={"Menu page max-sized-page "
				+ (this.props.match.params.path === undefined ? "Menu-big" : "")}>
				{this.props.match.params.path === undefined
					? <div className="row">
						<Carousel
							dynamicHeight={false}
							showStatus={false}
							showThumbs={false}
							infiniteLoop={true}
							autoPlay={true}
							interval={5000}
						>
							<div>
								<img src="/img/Slide_STRAT_1920x1080.jpg"/>
								<Link to="/strategy">
									<div className="row legend black-legend">
										<div className="col-md-12 Menu-hide-on-mobile">
											<div className="legend-title">
												National Cybersecurity Strategy IV
											</div>
										</div>
										<div className="col-md-12">
											The National Cybersecurity Strategy IV
											outlines how an integrated and
											comprehensive information security approach
											enables the government, private enterprises
											and citizens to fully seize the opportunities
											offered by the digital revolution. Discover it.
										</div>
									</div>
								</Link>
							</div>
							<div>
								<img src="/img/Slide_CYBERLUX_1920x1080.jpg"/>
								<Link to="/privatesector">
									<div className="row legend red-legend">
										<div className="col-xs-6 col-md-4 Menu-hide-on-mobile">
											<Analytic
												value={this.props.privateSectorCount ? this.props.privateSectorCount : 0}
												desc={"Private companies"}
											/>
										</div>
										<div className="col-xs-6 col-md-4 Menu-hide-on-mobile">
											<Analytic
												value={this.props.publicSectorCount ? this.props.publicSectorCount : 0}
												desc={"Public entities"}
											/>
										</div>
										<div className="col-xs-6 col-md-4 Menu-hide-on-mobile">
											<Analytic
												value={this.props.civilSocietyCount ? this.props.civilSocietyCount : 0}
												desc={"Civil society organisations"}
											/>
										</div>
										<div className="col-md-12">
											Discover this community with outstanding skills and
											knowledge offering an extensive expertise
											in cybersecurity.
										</div>
									</div>
								</Link>
							</div>
							<div>
								<img src="/img/Slide_October_1920x1080.jpg"/>

								<div className="row legend">
									<a
										href="https://cybersecuritymonth.eu/"
										target="_blank"
										rel="noreferrer">
										<div className="blue-legend">
											<div className="col-md-12">
												October stands for the European Cyber Security Month, the EU’s
												annual campaign dedicated to promoting cybersecurity.
											</div>
										</div>
									</a>

									<Link to="/cybersecurityweek">
										<div className="row blue-legend">
											<div className="col-md-9 Menu-hide-on-mobile">
												<img src="/img/logo_cswl_white.png"/>
											</div>

											<div className="col-md-3 legend-date Menu-hide-on-mobile">
												17-21 OCT 22
											</div>

											<div className="col-md-12">
												Cybersecurity Week Luxembourg is the unmissable Digital Security &
												Trust advocacy campaign bringing together Cybersecurity Experts, IT
												players & Tech enthusiasts.
											</div>
										</div>
									</Link>
								</div>
							</div>
							<div>
								<img src="/img/Slide_CSB_1920x1080.jpg" />
								<Link to={"/search?taxonomy_value=" + this.getArticleCategoryId("CYBERSECURITY BREAKFAST")}>
									<div className="row legend black-legend">
										<div className="col-md-12 Menu-hide-on-mobile">
											<img src="/img/logo_cyberbreakfast_white.png"/>
										</div>
										<div className="col-md-12">
											CYBERSECURITY Breakfast is a monthly
											series that addresses a new trendy topic each time.
											Join the next one!
										</div>
									</div>
								</Link>
							</div>
							<div>
								<img src="/img/Slide_ITV_1920x1080.jpg" />
								<Link to={"/search?taxonomy_value=" + this.getArticleCategoryId("LËTZ TALK ABOUT CYBER")}>
									<div className="row legend black-legend">
										<div className="col-md-12 Menu-hide-on-mobile">
											<img src="/img/logo_ltac_white.png"/>
										</div>
										<div className="col-md-12">
											Learn about Cybersecurity Professionals who stand out
											with their personal stories and journeys.
										</div>
									</div>
								</Link>
							</div>
						</Carousel>
					</div>
					: ""
				}

				<Navbar expand="lg">
					<Navbar.Brand>
						<Link to="/">
							<img
								className={"Menu-logo"}
								src="/img/National-platform-logo-subtitle.png"
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
							<Nav.Link eventKey="about">
								<Link to="/about">
									<div className="Menu-title">About</div>
									<div className="Menu-description">What is CYBERLUX?</div>
								</Link>
							</Nav.Link>
							<Nav.Link className="Menu-help">
								<Link to="/help">
									<div className="Menu-title">Help!</div>
								</Link>
							</Nav.Link>
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
