import React from "react";
import "./PageCyberWeek.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageCyberWeek extends React.Component {
	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/cybsersecurityweek">CYBERSECURITY WEEK LUXEMBOURG</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h1>CYBER WEEK</h1>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-4"/>

					<div
						className="col-md-4 shadow-section blue-shadow-section centered-shadow-section"
						onClick={() => this.props.ml_account("webforms", "3328240", "r1e0z6", "show")}>
						<div className="PageNews-newsletter-content">
							<h3>Subscribe now</h3>

							<i className="fas fa-paper-plane"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
