import React from "react";
import "./PageResources.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShadowBox from "../box/ShadowBox.jsx";

export default class PageChallenge extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageResources" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/resources">RESOURCES</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="practices"
							title={"Cyber awareness & best practices"}
							icon={"fas fa-tasks"}
							color={"blue"}
						/>
						<ShadowBox
							link="podcasts"
							title={"Podcasts"}
							icon={"fas fa-microphone-alt"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="frameworks"
							title={"Legal framework"}
							icon={"fas fa-gavel"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
