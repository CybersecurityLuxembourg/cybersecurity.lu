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

	getCoreStartups() {
		getRequest.call(this, "public/get_public_companies?"
			+ "ecosystem_role=ACTOR&entity_type=PRIVATE%20SECTOR"
			+ "&corebusiness_only=true&startup_only=true", (data) => {
			this.setState({
				coreStartups: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<Popup
				className={"Popup-full-size"}
				trigger={
					<div className="shadow-section blue-shadow-section centered-shadow-section">
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
