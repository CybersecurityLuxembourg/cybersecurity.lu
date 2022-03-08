import React from "react";
import "./PageAbout.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ShadowBox from "../box/ShadowBox.jsx";

export default class PageAbout extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageAbout" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/about">ABOUT</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-6">
						<ShadowBox
							link="initiative"
							title={"The initiative"}
							icon={"fas fa-bullhorn"}
							color={"blue"}
						/>
						<ShadowBox
							link="strategy"
							title={"The national strategy"}
							icon={"fas fa-chess"}
							color={"blue"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="whatsinit"
							title={"What's in it for you?"}
							icon={"fas fa-boxes"}
							color={"blue"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
