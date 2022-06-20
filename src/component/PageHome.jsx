import React from "react";
import "./PageHome.css";
import ShadowBoxPcDoctor from "./box/ShadowBoxPcDoctor.jsx";
import ShadowBoxPureStartup from "./box/ShadowBoxPureStartup.jsx";
import ShadowBoxCyber4Growth from "./box/ShadowBoxCyber4Growth.jsx";
import ShadowBoxECSC from "./box/ShadowBoxECSC.jsx";
import ShadowBox from "./box/ShadowBox.jsx";
import PageHomeBanner from "./pagehome/PageHomeBanner.jsx";
import PageHomeLatestNews from "./pagehome/PageHomeLatestNews.jsx";
import PageHomeCallToAction from "./pagehome/PageHomeCallToAction.jsx";
import PageHomeComingEvents from "./pagehome/PageHomeComingEvents.jsx";
import FlashNews from "./bar/FlashNews.jsx";

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

				<PageHomeBanner/>

				<div className="blue-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Latest news</h1>
							</div>

							<div className="col-md-12">
								<PageHomeLatestNews
									analytics={this.props.analytics}
								/>
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

				<div className="black-bordered">
					{this.getBackgroundPetal()}
					{this.getBackgroundPetalBottom()}

					<div className="max-sized-page">
						<div className="row">
							<div className="col-md-12">
								<h1>Upcoming events</h1>
							</div>

							<div className="col-md-12">
								<PageHomeComingEvents
									analytics={this.props.analytics}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
