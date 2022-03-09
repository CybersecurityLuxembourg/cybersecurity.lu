import React from "react";
import "./PageEcosystem.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShadowBox from "../box/ShadowBox.jsx";

export default class PageEcosystem extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageEcosystem" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/ecosystem">ECOSYSTEM</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="privatesector"
							title={"Private sector"}
							icon={"fas fa-building"}
							color={"blue"}
						/>
						<ShadowBox
							link="civilsociety"
							title={"Civil society"}
							icon={"fas fa-people-carry"}
							color={"blue"}
						/>
						<ShadowBox
							link="map"
							title={"Map"}
							icon={"fas fa-map-marked-alt"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="publicsector"
							title={"Public sector"}
							icon={"fas fa-landmark"}
							color={"blue"}
						/>
						<ShadowBox
							link="dashboard"
							title={"Dashboard"}
							icon={"fas fa-chart-pie"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
