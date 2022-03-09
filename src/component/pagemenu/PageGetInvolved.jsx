import React from "react";
import "./PageGetInvolved.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShadowBox from "../box/ShadowBox.jsx";

export default class PageGetInvolved extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageGetInvolved" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/get_involved">GET INVOLVED</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="breakfast"
							title={"CYBERSECURITY Breakfast"}
							icon={"fas fa-mug-hot"}
							color={"blue"}
						/>
						<ShadowBox
							link="challenge"
							title={"Luxembourg Challenge"}
							icon={"fas fa-trophy"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cyber4growth"
							title={"CYBER4Growth"}
							icon={"fas fa-rocket"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
