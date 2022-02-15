import React from "react";
import "./Cyber4GrowthProgram.css";

export default class Cyber4GrowthProgram extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"Cyber4GrowthProgram"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2 ref={this.partStages}>Programs</h2>
					</div>

					<div className="col-md-12">
						<p>
							There are two different programs according to the business of the start-up.
							A common trunk concerns all the start-ups. Some additional modules are available
							for the start-ups with a cybersecurity core business. Those are related to
							promotion on a national and international scale.
						</p>
					</div>
				</div>

				<div className="row">
					<div className="col-md-2 offset-md-3">
						<div className="shadow-section blue-shadow-section centered-shadow-section"/>
					</div>

					<div className="col-md-5">
						<h4>Modules of the common trunk</h4>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-2 offset-md-3">
						<div className="shadow-section red-shadow-section centered-shadow-section"/>
					</div>

					<div className="col-md-5">
						<h4>Modules dedicated to the cybersecurity startup program</h4>
					</div>
				</div>

				<div className="row row-spaced Cyber4GrowthProgram-program">
					<div className="col-md-4 Cyber4GrowthProgram-program-criteria">
						<h4>Self-assessment</h4>
					</div>

					<div className="col-md-8">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<h4>Self-assessment forms to be filled</h4>
						</div>

						<div className="row">
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>

							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Fit4Cybersecurity</h5>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Fit4Privacy</h5>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Testing platform</h5>
								</div>
							</div>
						</div>

						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<h4>Security and privacy reports</h4>
						</div>
					</div>

					<div className="col-md-8 offset-md-4 centered">
						<i className="fas fa-arrow-down"/>
					</div>

					<div className="col-md-4 Cyber4GrowthProgram-program-criteria">
						<h4>Diagnostic</h4>
					</div>

					<div className="col-md-8">
						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<h4>Report analysis by experts (2 hours per company)</h4>
						</div>

						<div className="row">
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>
							<div className="col-md-4 centered">
								<i className="fas fa-arrow-down fa-arrow-down-small"/>
							</div>

							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Identify vulnerabilities</h5>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Evaluate the level of maturity of the IT system</h5>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h5>Issue recommendations</h5>
								</div>
							</div>
						</div>

						<div className="shadow-section blue-shadow-section centered-shadow-section">
							<h4>Security and privacy recommendations</h4>
						</div>
					</div>

					<div className="col-md-8 offset-md-4 centered">
						<i className="fas fa-arrow-down"/>
					</div>

					<div className="col-md-4 Cyber4GrowthProgram-program-criteria">
						<h4>Training and actions</h4>
					</div>

					<div className="col-md-8">
						<div className="row">
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<h4>Premium trainings and services available on the catalogue</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section red-shadow-section centered-shadow-section">
									<h4>Meeting with the public and the private player in Luxembourg</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section red-shadow-section centered-shadow-section">
									<h4>Enroll in international events with the Luxembourgish delegation</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
