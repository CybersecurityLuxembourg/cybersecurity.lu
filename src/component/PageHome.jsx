import React from "react";
import "./PageHome.css";
import ShadowBoxPcDoctor from "./box/ShadowBoxPcDoctor.jsx";
import ShadowBoxPureStartup from "./box/ShadowBoxPureStartup.jsx";
import ShadowBoxEducation from "./box/ShadowBoxEducation.jsx";
import ShadowBoxCyber4Growth from "./box/ShadowBoxCyber4Growth.jsx";
import ShadowBoxECSC from "./box/ShadowBoxECSC.jsx";
import ShadowBoxJobs from "./box/ShadowBoxJobs.jsx";
import PageHomeLatestNews from "./pagehome/PageHomeLatestNews.jsx";
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

				<div className="PageHome-banner">
					<div className="max-sized-page">
						<div className="row row-spaced">
							<div className="col-md-6">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									content
								</div>
							</div>
							<div className="col-md-6">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									content
								</div>
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
								<h1>View on our programmes & challenges</h1>
							</div>

							<div className="col-md-6">
								<ShadowBoxCyber4Growth/>
							</div>
							<div className="col-md-6">
								<ShadowBoxECSC/>
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
								<h1>Ecosystem highlights</h1>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-6">
								<ShadowBoxPcDoctor
									analytics={this.props.analytics}
									color={"red"}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxPureStartup
									color={"red"}
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
								<h1>Education & jobs</h1>
							</div>

							<div className="col-md-6">
								<ShadowBoxEducation
									{...this.props}
								/>
							</div>
							<div className="col-md-6">
								<ShadowBoxJobs
									{...this.props}
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
								<h1>Be visible & take part in the initiatives</h1>
							</div>

							<div className="col-md-12">
								content
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
