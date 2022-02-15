import React from "react";
import "./Cyber4GrowthPresentation.css";
import { NotificationManager as nm } from "react-notifications";
import Loading from "../box/Loading.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";
import Company from "../item/Company.jsx";
import Message from "../box/Message.jsx";
import SimpleTable from "../table/SimpleTable.jsx";

export default class Cyber4GrowthPresentation extends React.Component {
	constructor(props) {
		super(props);

		this.getVCs = this.getVCs.bind(this);

		this.state = {
			vcEntities: null,
			mediaEntities: null,
			partners: null,
		};

		this.partPresentation = React.createRef();
		this.partWhy = React.createRef();
		this.partPrograms = React.createRef();
		this.partPartners = React.createRef();
		this.partVC = React.createRef();
		this.partMedia = React.createRef();
	}

	componentDidMount() {
		this.getVCs();
		this.getMedia();
		this.getCyber4GrowthPartners();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics && !this.state.vcEntities) {
			this.getVCs();
		}

		if (!prevProps.analytics && this.props.analytics && !this.state.mediaEntities) {
			this.getMedia();
		}

		if (!prevProps.analytics && this.props.analytics && !this.state.partners) {
			this.getCyber4GrowthPartners();
		}
	}

	getVCs() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "VENTURE CAPITAL");

			if (values.length > 0) {
				this.setState({
					vcEntities: null,
				});

				const params = dictToURI({
					taxonomy_values: values[0].id,
				});

				getRequest.call(this, "public/get_public_companies?" + params, (data) => {
					this.setState({
						vcEntities: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					vcEntities: [],
				});
			}
		}
	}

	getMedia() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "MEDIA");

			if (values.length > 0) {
				this.setState({
					mediaEntities: null,
				});

				const params = dictToURI({
					taxonomy_values: values[0].id,
				});

				getRequest.call(this, "public/get_public_companies?" + params, (data) => {
					this.setState({
						mediaEntities: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					mediaEntities: [],
				});
			}
		}
	}

	getCyber4GrowthPartners() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "CYBER4GROWTH ROLE" && v.name === "PARTNER")
				.map((v) => v.id);

			if (values.length > 0) {
				this.setState({
					partners: null,
				});

				const params = dictToURI({
					taxonomy_values: values,
				});

				getRequest.call(this, "public/get_public_companies?" + params, (data) => {
					this.setState({
						partners: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			} else {
				this.setState({
					partners: [],
				});
			}
		}
	}

	static copyToClipboard(text) {
		const dummy = document.createElement("input");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		dummy.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(dummy);
		nm.info("Copied to clipboard!");
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"Cyber4GrowthPresentation"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-3 order-1 order-md-2">
						<div className="shortcut-box">
							<h2 onClick={() => this.partPresentation.current.scrollIntoView({ behavior: "smooth" })}>
								Presentation
							</h2>
							<h2 onClick={() => this.partPrograms.current.scrollIntoView({ behavior: "smooth" })}>
								Two programs
							</h2>
							<h2 onClick={() => this.partPartners.current.scrollIntoView({ behavior: "smooth" })}>
								Partners
							</h2>
							<h2 onClick={() => this.partVC.current.scrollIntoView({ behavior: "smooth" })}>
								Venture capital
							</h2>
							<h2 onClick={() => this.partMedia.current.scrollIntoView({ behavior: "smooth" })}>
								Media
							</h2>
						</div>
					</div>

					<div className="col-md-9 order-2 order-md-1">
						<h2 ref={this.partPresentation}>Presentation</h2>

						<div className="row">
							<div className="col-md-12">
								<p>
									CYBER4Growth is a collaborative platform for entrepreneurs to have
									access to state of the art cybersecurity services. The partners of the
									program are experts with extensive knowledge of start-ups needs in terms
									of financing, innovation, access to market and growth.
								</p>
							</div>

							<div className="col-md-3"/>
							<div className="col-md-6 Cyber4GrowthPresentation-images">
								<div>
									<img src={"/img/cyber4growth.png"}/>
								</div>
							</div>
							<div className="col-md-3"/>

							<div className="col-md-12">
								CYBER4Growth targets both cybersecurity entrepreneurs who are looking for
								tailor-made support and tech entrepreneurs needing to secure their
								solution. The ambition of the platform is to position Luxembourg as THE
								platform to grow, accelerate and scale in cybersecurity.
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-9">
						<div className="row">
							<div className="col-md-12">
								<h2 ref={this.partPrograms}>Two programs</h2>
							</div>

							<div className="col-md-12">
								We have two programs according to the profile of the start-up.
							</div>
						</div>

						<div className="row row-spaced Cyber4GrowthPresentation-program">
							<div className="col-md-4">
							</div>
							<div className="col-md-4 centered">
								<h3>Assess & Protect</h3>
							</div>
							<div className="col-md-4 centered">
								<h3>Improve & Connect</h3>
							</div>

							<div className="col-md-4 Cyber4GrowthPresentation-program-criteria">
								<h4>Target</h4>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>
										Dedicated to all profile of start-ups
									</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>
										Dedicated to cybersecurity start-ups
									</h4>
								</div>
							</div>

							<div className="col-md-4 Cyber4GrowthPresentation-program-criteria">
								<h4>Duration</h4>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>
										Approximatively 2 months
									</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>
										From 6 months to a year
									</h4>
								</div>
							</div>

							<div className="col-md-4 Cyber4GrowthPresentation-program-criteria">
								<h4>Access to cybersecurity ecosystem</h4>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>Yes</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Yes</h4>
								</div>
							</div>

							<div className="col-md-4 Cyber4GrowthPresentation-program-criteria">
								<h4>Access to venture capital</h4>
							</div>
							<div className="col-md-4">
								<div className="shadow-section grey-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>No</h4>
								</div>
							</div>
							<div className="col-md-4">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Yes</h4>
								</div>
							</div>

							<div className="col-md-4 Cyber4GrowthPresentation-program-criteria">
								<h4>Focus on</h4>
							</div>
							<div className="col-md-4 Cyber4GrowthPresentation-program-focus">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>Infrastructure</h4>
								</div>
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Assess & Protect
									</div>
									<h4>Legal and certifications</h4>
								</div>
							</div>
							<div className="col-md-4 Cyber4GrowthPresentation-program-focus">
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Infrastructure</h4>
								</div>
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Legal and certifications</h4>
								</div>
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Technology</h4>
								</div>
								<div className="shadow-section blue-shadow-section centered-shadow-section">
									<div className={"Cyber4GrowthPresentation-program-mobile"}>
										Improve & Connect
									</div>
									<h4>Business & internationalisation</h4>
								</div>
							</div>
						</div>

						<div className="row row-spaced">
							<div className="col-md-12">
								<h2 ref={this.partPartners}>Partners</h2>
							</div>

							{this.state.partners && this.state.partners.length === 0
								&& <div className="col-md-12">
									<Message
										text={"No partner found"}
										height={200}
									/>
								</div>
							}

							{this.state.partners && this.state.partners.length > 0
								&& this.state.partners.map((a) => (
									<div
										className="col-md-12"
										key={a.id}>
										<Company
											info={a}
										/>
									</div>
								))
							}

							{!this.state.partners
								&& <div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h2 ref={this.partVC}>Venture capital</h2>
					</div>

					<div className="col-md-3 order-1 order-md-2">
						<div className="shortcut-box">
							<h4>You want to stand in the VC list?</h4>

							<h4>
								Please contact:
							</h4>

							<h4>
								<a
									href={"#"}
									onClick={() => Cyber4GrowthPresentation.copyToClipboard("team@cybersecurity-luxembourg.com")}>
									team@cybersecurity-luxembourg.com
								</a>
							</h4>
						</div>
					</div>

					<div className="col-md-9 order-2 order-md-1">
						<div className="row">
							{this.state.vcEntities && this.state.vcEntities.length === 0
								&& <div className="col-md-12">
									<Message
										text={"No VC found"}
										height={200}
									/>
								</div>
							}

							{this.state.vcEntities && this.state.vcEntities.length > 0
								&& <div className="col-md-12">
									<SimpleTable
										elements={this.state.vcEntities.map((a, i) => [a, i])}
										numberDisplayed={6}
										buildElement={(a) => <div className="col-md-12">
											<Company
												info={a}
											/>
										</div>}
									/>
								</div>
							}

							{!this.state.vcEntities
								&& <div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h2 ref={this.partMedia}>Media</h2>
					</div>

					<div className="col-md-3 order-1 order-md-2">
						<div className="shortcut-box">
							<h4>You want to stand in the media list?</h4>

							<h4>
								Please contact:
							</h4>

							<h4>
								<a
									href={"#"}
									onClick={() => Cyber4GrowthPresentation.copyToClipboard("team@cybersecurity-luxembourg.com")}>
									team@cybersecurity-luxembourg.com
								</a>
							</h4>
						</div>
					</div>

					<div className="col-md-9 order-2 order-md-1">
						<div className="row row-spaced">
							{this.state.mediaEntities && this.state.mediaEntities.length === 0
								&& <div className="col-md-12">
									<Message
										text={"No media found"}
										height={200}
									/>
								</div>
							}

							{this.state.mediaEntities && this.state.mediaEntities.length > 0
								&& <div className="col-md-12">
									<SimpleTable
										elements={this.state.mediaEntities.map((a, i) => [a, i])}
										numberDisplayed={6}
										buildElement={(a) => <div className="col-md-12">
											<Company
												info={a}
											/>
										</div>}
									/>
								</div>
							}

							{!this.state.mediaEntities
								&& <div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
