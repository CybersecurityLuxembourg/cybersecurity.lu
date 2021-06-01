import React from "react";
import "./Menu.css";
import { Carousel } from "react-responsive-carousel";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { getPrivateAppURL, getEcosystemAppURL } from "../../utils/env.jsx";
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
			<Nav.Link>
				<Link to="/">
					<div className="Menu-title">Home</div>
					<div className="Menu-description">Our main lines</div>
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to="/news">
					<div className="Menu-title">What&apos;s up?</div>
					<div className="Menu-description">Keep an eye out</div>
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to="/calendar">
					<div className="Menu-title">Where to meet?</div>
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
			{/* eslint-disable no-script-url */}
			<a href="javascript:;"
				className="nav-link nav-link-blue"
				onClick={() => this.props.ml_account("webforms", "3328240", "r1e0z6", "show")}>
				<div className="Menu-title"><i className="fas fa-envelope-open-text"/> Newsletter</div>
				<div className="Menu-description">Our monthly selection</div>
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
			<div className={"max-sized-page "
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
								<img src="/img/Slide_CYBERLUX_1920x1080.jpg" />
								<div className="row legend blue-legend">
									<div className="col-md-6">
										<img src="/img/logo_cyberlux_white.png"/>
									</div>
									<div className="col-md-12">
										300+ private & public entities share
										outstanding skills, knowledge and offer an extensive expertise
										in cybersecurity. Discover this community, keep up with the
										latest news & upcoming events.
									</div>
								</div>
							</div>
							<div>
								<img src="/img/Slide_CSWL_1920x1080.jpg"/>
								<a
									href="https://www.cybersecurityweek.lu/"
									target="_blank"
									rel="noreferrer">
									<div className="row legend red-legend">
										<div className="col-md-6">
											<img src="/img/logo_cswl_white.png"/>
										</div>
										<div className="col-md-6 legend-date">
											18 OCT 2021
											<br/>
											28 OCT 2021
										</div>
										<div className="col-md-12">
											CYBERSECURITY Week Luxembourg is the
											unmissable Digital Security & Trust Advocacy Campaign bringing
											together Cybersecurity Experts, IT players & Tech Enthusiasts.
											Find out more.
										</div>
									</div>
								</a>
							</div>
							<div>
								<img src="/img/Slide_CSB_1920x1080.jpg" />
								<Link to={"/search?taxonomy_value=" + this.getArticleCategoryId("CYBERSECURITY BREAKFAST")}>
									<div className="row legend black-legend">
										<div className="col-md-6">
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
										<div className="col-md-6">
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
								src="/img/ecosystem-logo-subtitle.jpg"
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
							<a
								className="nav-link"
								href={getPrivateAppURL()}
								rel="noreferrer"
							>
								<div className="Menu-title">My CYBERLUX</div>
								<div className="Menu-description">Login or subscribe</div>
							</a>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				{this.state.showFlyingMenu
					&& <div className={"Menu-flying-menu-wrapper max-sized-page"}>
						<div className="Menu-flying-menu">
							<img
								src="/img/logo.png"
								alt="CYBERLUX Logo"
							/>
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
