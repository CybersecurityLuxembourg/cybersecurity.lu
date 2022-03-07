import React from "react";
import "./PageHome.css";
import { Link } from "react-router-dom";
import ShadowBoxPcDoctor from "./box/ShadowBoxPcDoctor.jsx";
import ShadowBoxPureStartup from "./box/ShadowBoxPureStartup.jsx";
// import ShadowBoxEducation from "./box/ShadowBoxEducation.jsx";
import ShadowBoxCyber4Growth from "./box/ShadowBoxCyber4Growth.jsx";
import ShadowBoxECSC from "./box/ShadowBoxECSC.jsx";
// import ShadowBoxJobs from "./box/ShadowBoxJobs.jsx";
import ShadowBox from "./box/ShadowBox.jsx";
import PageHomeLatestNews from "./pagehome/PageHomeLatestNews.jsx";
import PageHomeCallToAction from "./pagehome/PageHomeCallToAction.jsx";
import FlashNews from "./bar/FlashNews.jsx";
import { getPrivateAppURL } from "../utils/env.jsx";

export default class PageHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	getBackgroundPetal() {
		return <ul className="Background-petals">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>;
	}

	// eslint-disable-next-line class-methods-use-this
	getBackgroundPetalBottom() {
		return <ul className="Background-petals-bottom">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>;
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageHome"}>
				<FlashNews analytics={this.props.analytics}/>

				<div className="PageHome-banner">
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
										<br/>
										<div>
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
										<div className="PageHome-banner-more">
											<em>What&apos;s more?</em> <i className="fas fa-arrow-right"/>
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
										<br/>
										<div>
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
										<div className="PageHome-banner-more">
											<em>What&apos;s more?</em> <i className="fas fa-arrow-right"/>
										</div>
									</div>}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Latest news</h1>
							</div>

							<div className="col-md-12">
								<PageHomeLatestNews/>
							</div>
						</div>
					</div>
				</div>

				<div className="black-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-12">
								<h1>Get involved</h1>
							</div>

							<div className="col-md-8 offset-md-2 row-spaced PageHome-description">
								Become an active member of the ecosystem and gain great visibility!
								Throughout the year, a wide set of actions is organised by
								the ecosystem for the ecosystem.
							</div>

							<div className="col-md-4">
								<ShadowBox
									link="breakfast"
									title={"CYBERSECURITY Breakfast"}
									icon={"fas fa-mug-hot"}
									abstract={"Become partner of the month!"}
									color={"black"}
								/>
							</div>
							<div className="col-md-4">
								<ShadowBoxCyber4Growth/>
							</div>
							<div className="col-md-4">
								<ShadowBoxECSC
									color="black"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="red-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Call to action</h1>
							</div>

							<div className="col-md-12">
								<PageHomeCallToAction
									analytics={this.props.analytics}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Ecosystem highlights</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-6">
								<ShadowBoxPcDoctor
									analytics={this.props.analytics}
									color={"blue"}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxPureStartup
									color={"blue"}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="red-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Education & jobs</h1>
							</div>

							<div className="col-md-6">
								<ShadowBoxEducation
									color={"red"}
									{...this.props}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxJobs
									color={"red"}
									{...this.props}
								/>
							</div>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}
