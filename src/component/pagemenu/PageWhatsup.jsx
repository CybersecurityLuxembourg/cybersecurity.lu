import React from "react";
import "./PageWhatsup.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShadowBox from "../box/ShadowBox.jsx";

export default class PageWhatsup extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageWhatsup" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/whatsup">WHAT&apos;S UP?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="news"
							title={"News"}
							icon={"fas fa-tasks"}
							color={"blue"}
						/>
						<ShadowBox
							link="events"
							title={"Upcoming events"}
							icon={"fas fa-tasks"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="ltac"
							title={"Lëtz Talk About Cyber"}
							icon={"fas fa-gavel"}
							color={"blue"}
						/>
						<ShadowBox
							link="newsletter"
							title={"Newsletter"}
							icon={"fas fa-microphone-alt"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
