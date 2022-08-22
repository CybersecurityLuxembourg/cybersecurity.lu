import React from "react";
import "./CyberWeekBecomeASponsor.css";
import ShadowBox from "../box/ShadowBox.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class CyberWeekBecomeASponsor extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekBecomeASponsor"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Become a sponsor</h2>
					</div>

					<div className="col-md-12">
						<p>Take advantage of this new opportunity by expressing
						your interest in any of the following options:</p>
					</div>

					<div className="col-md-12">
						<ul>
							<li>
								Become sponsor of the event
							</li>
							<li>
								Book a booth in the exhibition area
							</li>
							<li>
								Suggest a speaking contribution (topics and speakers)
							</li>
						</ul>
					</div>

					<div className="col-md-12 row-spaced">
						Reach out to <a href="mailto:info@cybersecurityweek.lu">info@cybersecurityweek.lu</a>.
					</div>

					<div className="col-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open(getApiURL() + "public/get_public_document/CSWL22_brochure_sponsors.pdf", "_blank")}
							title="Download the packages description"
							icon="fas fa-file-pdf"
						/>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Exclusive media visibility opportunities</h2>
					</div>

					<div className="col-md-12 row-spaced">
						<p>Get visible in the digital report, ‘Insights – Cybersecurity’ that
						will be published by <a
							href="https://www.farvest.com/"
							target="_blank"
							rel="noreferrer">FARVEST</a> after the Cybersecurity Week and IT One
						Gala, to echo these intense cybersecurity-focused events.</p>

						<p>This special edition of ‘Insights’ will gather the highlights
						of the Cybersecurity Week Luxembourg, exclusive interviews and
						articles of event partners and industry leaders.</p>

						<p>You want to appear in this edition? Get exclusive discounts in
						the framework of the Cybersecurity Week Luxembourg!</p>
					</div>

					<div className="col-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open(getApiURL() + "public/get_public_document/Insights_brochure_2022.pdf", "_blank")}
							title="Download the Insights brochure"
							icon="fas fa-file-pdf"
						/>
					</div>
				</div>
			</div>
		);
	}
}
