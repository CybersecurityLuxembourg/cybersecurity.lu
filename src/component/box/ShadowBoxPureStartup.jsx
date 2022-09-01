import React from "react";
import "./ShadowBoxPureStartup.css";
import Popup from "reactjs-popup";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Entity from "../item/Entity.jsx";
import Loading from "./Loading.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class ShadowBoxPureStartup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			coreStartups: null,
		};
	}

	getCoreStartups() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const entityTypes = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE" && v.name === "PRIVATE SECTOR")
				.map((v) => v.id);

			const exosystemRoles = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "ACTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0 && exosystemRoles.length > 0) {
				this.setState({
					coreStartups: null,
				}, () => {
					const params = {
						taxonomy_values: entityTypes.concat(exosystemRoles),
						startup_only: true,
						corebusiness_only: true,
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							coreStartups: data,
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
								<h3>Pure Cyber Startups</h3>
								<i className="fas fa-rocket"/>
								<div className="PageHome-newsletter-content-desc">
									Have a look on the startups with cybersecurity
									as a core business
								</div>
							</div>
						</a>
					</div>
				}
				onOpen={() => this.getCoreStartups()}
				modal
			>
				{(close) => (
					<div className={"row PageHome-how-to-use-content"}>
						<div className={"col-md-12"}>
							{// eslint-disable-next-line
							}<h2>Pure Cyber Startups</h2>
							<div className="top-right-buttons">
								<button
									className={"red-background"}
									onClick={close}>
									<i className="fas fa-times"/>
								</button>
							</div>
						</div>

						{this.state.coreStartups
							? <div className={"col-md-12"}>
								<div className={"row"}>
									{this.state.coreStartups.map((c) => <div
										key={c.id}
										className={"col-md-6"}>
										<Entity
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
