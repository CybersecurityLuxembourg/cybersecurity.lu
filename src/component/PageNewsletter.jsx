import React from "react";
import "./PageNewsletter.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageNewsletter extends React.Component {
	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/newsletter">NEWSLETTER</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h1>Monthly Newsletter of the Luxembourg Cybersecurity Ecosystem</h1>

						<p>
							Keep up to date with the latest cybersecurity news in and around Luxembourg:
							rom institutional news, to the tech corner and upcoming events, find a review
							of all the newest developments in one place and remain a step ahead of
							what&apos;s coming next.
						</p>
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

				<div className="row row-spaced">
					<div className="col-md-12">
						<p>
							Sent every first Tuesday of the month, this monthly newsletter is a great
							opportunity to get to know the entities that make up the ecosystem.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
