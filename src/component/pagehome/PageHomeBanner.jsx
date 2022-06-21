import React from "react";
import "./PageHomeBanner.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { getPrivateAppURL } from "../../utils/env.jsx";
import ShadowBox from "../box/ShadowBox.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default class PageHomeBanner extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return <div className="PageHome-banner">
			<Carousel
				dynamicHeight={false}
				showStatus={false}
				showThumbs={false}
				infiniteLoop={true}
				autoPlay={true}
				interval={5000}
			>
				<div>
					<img src="/img/Slide_CYBERLUX_1920x1080.jpg"/>

					<div className="PageHome-banner-slide">
						<div className="max-sized-page">
							<div className="row row-spaced">
								<div className="col-md-1"/>
								<div className="col-md-10">
									<div className="PageHome-banner-title">
										<h3>The national cybersecurity portal for:</h3>
									</div>
								</div>
								<div className="col-md-1"/>
								<div className="col-md-1"/>
								<div className="col-md-5">
									<ShadowBox
										title={"Cybersecurity actors"}
										abstract={<div>
											<div>
												Enhance your visibility, contribute to the influence of
												our community and take part in initiatives designed for you
											</div>
											<br className="hide-on-mobile"/>
											<div className="PageHome-banner-icons hide-on-mobile">
												<Link to="challenge">
													<i className="fas fa-trophy"/>
													<span className="tooltiptext">National challenge</span>
												</Link>
												<Link to="cyber4growth">
													<i className="fas fa-rocket"/>
													<span className="tooltiptext">CYBER4Growth</span>
												</Link>
												<Link to="breakfast">
													<i className="fas fa-mug-hot"/>
													<span className="tooltiptext">Cybersecurity Breakfast</span>
												</Link>
												<a href={getPrivateAppURL()}>
													<i className="fas fa-key"/>
													<span className="tooltiptext">Private space</span>
												</a>
											</div>
											<div className="PageHome-banner-more hide-on-mobile">
												<Link to="whatsinit?tab=CybersecurityActors">
													<em>What&apos;s more?</em> <i className="fas fa-arrow-right"/>
												</Link>
											</div>
										</div>}
									/>
								</div>
								<div className="col-md-5">
									<ShadowBox
										title={"Users"}
										abstract={<div>
											<div>
												All your cybersecurity needs in one place
											</div>
											<br className="hide-on-mobile"/>
											<div className="PageHome-banner-icons hide-on-mobile">
												<Link to="practices">
													<i className="fas fa-tasks" title=""/>
													<span className="tooltiptext">Best practices</span>
												</Link>
												<Link to="">
													<i className="fas fa-user-md"/>
													<span className="tooltiptext">PC doctors</span>
												</Link>
												<Link to="jobs">
													<i className="fas fa-briefcase"/>
													<span className="tooltiptext">Cybersecurity jobs</span>
												</Link>
												<Link to="cybersecurityweek">
													<i className="fas fa-plug"/>
													<span className="tooltiptext">Cybersecurity Week</span>
												</Link>
											</div>
											<div className="PageHome-banner-more hide-on-mobile">
												<Link to="whatsinit?tab=Users">
													<em>What&apos;s more?</em> <i className="fas fa-arrow-right"/>
												</Link>
											</div>
										</div>}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<img src="/img/Slide_CSWL.png"/>

					<div className="PageHome-banner-slide-cswl">
						<div className="max-sized-page">
							<div className="row row-spaced">
								<div className="col-md-1"/>
								<div className="col-md-4">
									<ShadowBox
										link="cybersecurityweek"
										title={"18-20 October 2022"}
										abstract={"Click to know more"}
										color={"blue"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Carousel>
		</div>;
	}
}
