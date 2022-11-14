import React from "react";
import "./CyberWeekPresentation.css";
import { Link } from "react-router-dom";

export default class CyberWeekPresentation extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekPresentation"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<img
							className="CyberWeekPresentation-image"
							src="img/cswl_banner_2022.png"
							alt="CSWL 2022"
						/>
					</div>

					<div className="col-md-12 row-spaced">
						<h2>
							Cybersecurity Week Luxembourg is back in a brand new format
						</h2>

						<h3>
							Save the date and secure your spot!
						</h3>

						<p>
							For the first time, CYBERSECURITY Luxembourg will bring together, under
							one roof, the <b>cybersecurity community and key international partners</b>
							during the 2022 Cybersecurity Week Luxembourg, in the frame of
							the <a
								href={"https://cybersecuritymonth.eu/"}
								target="_blank"
								rel="noreferrer"
							>European Cyber Security Month</a>. This global event will showcase <b>a
							conference stream and an exhibition area</b>, where each actor is offered
							the opportunity to be visible and share its expertise with its
							peers, potential partners and customers.
						</p>

						<h3>
							We all have a role to play
						</h3>

						<p>
							The event will involve public and private actors coming from
							Luxembourg, the neighbouring region, Europe and
							beyond. Decision-makers, C-levels, researchers, cybersecurity
							professionals from different sectors and industries and everyone
							looking for cybersecurity insights are expected to attend the event.
						</p>

						<p>
							Cybersecurity is everyone’s responsibility. One of the main
							objectives of the Cybersecurity Week Luxembourg is to share the
							latest trends and best practices to face the cybersecurity challenges
							that lie ahead. <Link to="/cybersecurityweek?tab=Exhibition_area">Many actors</Link> from the cybersecurity ecosystem will be
							there to present their most innovative solutions and create new connections.
						</p>

						<p>
							The event is open to everyone, free of charge.
						</p>

						<h3>
							Discover an exciting programme
						</h3>

						<h4>
							Conference stream
						</h4>

						<p>
							A wide range of topics will be addressed. From technical to
							institutional, the different keynotes and panel discussions
							will explore the various areas of cybresecurity-related activities.
						</p>

						<h4>
							Exhibition area
						</h4>

						<p>
							Cybersecurity Week Luxembourg is an excellent occasion to create
							new connections, strengthen existing synergies and learn more
							about the latest innovative solutions.
						</p>

						<h4>
							International Matchmaking Event by b2fair®
						</h4>

						<p>
							The Cybersecurity International Business Meetings by
							b2fair®, organised by the Enterprise Europe Network of the
							Luxembourg Chamber of Commerce, will provide you with a unique
							matchmaking experience, combining both the personalised professional
							guidance of an experienced matchmaking team and the advantages of a
							digital business platform driven by AI technology.
						</p>

						<ul>
							<li>Keep an eye on the <Link to="/cybersecurityweek?tab=Programme">Programme</Link> tab.</li>
							<li>Get the latest <Link to="/public/get_public_document/CSWL22_brochure_sponsors.pdf">sponsoring opportunities</Link>.</li>
							<li>Join the <Link to="/cybersecurityweek?tab=About_the_gala">Gala and Awards Night</Link>.</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
