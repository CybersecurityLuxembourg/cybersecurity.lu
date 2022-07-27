import React from "react";
import "./ShadowBoxPcDoctor.css";
import Popup from "reactjs-popup";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Company from "../item/Company.jsx";
import Loading from "./Loading.jsx";

export default class ShadowBoxPcDoctor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pcDoctors: null,
		};
	}

	getPCDoctors() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const individualValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TARGET" && v.name === "INDIVIDUAL")
				.map((v) => v.id);

			const entityTypes = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE" && v.name === "PRIVATE SECTOR")
				.map((v) => v.id);

			const exosystemRoles = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "ACTOR")
				.map((v) => v.id);

			if (individualValues.length > 0 && entityTypes.length > 0 && exosystemRoles.length > 0) {
				this.setState({
					pcDoctors: null,
				}, () => {
					const params = {
						taxonomy_values: entityTypes.concat(exosystemRoles).concat(individualValues),
					};

					getRequest.call(this, "public/get_public_companies?" + dictToURI(this.state.params), (data) => {
						this.setState({
							pcDoctors: data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			}
		}
	}

	getColor() {
		if (this.props.color) {
			return this.props.color;
		}

		return "blue";
	}

	render() {
		return (
			<Popup
				className={"Popup-full-size"}
				trigger={
					<div className={"shadow-section " + this.getColor() + "-shadow-section centered-shadow-section"}>
						{/* eslint-disable no-script-url */}
						<a>
							<div>
								<h3>PC Doctors</h3>
								<i className="fas fa-user-md"/>
								<div className="PageHome-newsletter-content-desc">
									See the list of companies providing services in order
									to support the individuals
								</div>
							</div>
						</a>
					</div>
				}
				onOpen={() => this.getPCDoctors()}
				modal
			>
				{(close) => (
					<div className={"row PageHome-how-to-use-content"}>
						<div className={"col-md-12"}>
							{// eslint-disable-next-line
							}<h2>PC Doctors</h2>
							<div className="top-right-buttons">
								<button
									className={"red-background"}
									onClick={close}>
									<i className="fas fa-times"/>
								</button>
							</div>
						</div>

						{this.state.pcDoctors
							? <div className={"col-md-12"}>
								<div className={"row"}>
									{this.state.pcDoctors.map((c) => <div
										key={c.id}
										className={"col-md-6"}>
										<Company
											info={c}
										/>
									</div>)}
								</div>
							</div>
							: <div className={"col-md-12"}>
								<Loading
									height={300}
								/>
							</div>
						}
					</div>
				)}
			</Popup>
		);
	}
}
