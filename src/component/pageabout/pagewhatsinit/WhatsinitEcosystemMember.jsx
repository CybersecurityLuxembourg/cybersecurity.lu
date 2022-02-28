import React from "react";
import "./WhatsinitEcosystemMember.css";
import ShadowBox from "../../box/ShadowBox.jsx";
import { getPrivateAppURL } from "../../../utils/env.jsx";

export default class WhatsinitEcosystemMember extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"WhatsinitEcosystemMember page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>What&apos;s in it for you? – Ecosystem members</h1>
					</div>

					<div className="col-md-12 row-spaced">
						<img
							className={"WhatsinitEcosystemMember-member-image"}
							src="/img/ecosystem_member_page.jpg"
						/>
					</div>

					<div className="col-md-12">
						<p>
							<b>CYBERSECURITY Luxembourg</b> is there to strengthen the links between
							the actors of our ecosystem and our international partners as well
							as enhance the recognition of our ecosystem beyond our national borders.
						</p>

						<p>
							Therefore, by joining CYBERSECURITY Luxembourg in the various actions
							organised for and/or by the ecosystem, <b>you enhance your organisation&apos;s
							visibility and contribute to the influence of our community</b>.
						</p>

						<p>
							<b>This platform will keep you informed on the latest developments in our
							cybersecurity community, such as the various projects/programmes/events
							you can take part in to take cybersecurity to the next level.</b>
						</p>

						<p>
							Your <a href={getPrivateAppURL()}>private space</a> allows you to gain
							full access to the platform and
							become part of the ecosystem by playing an active role and shaping its
							future. Once your request is approved, you can create an account and ask
							for an assignment to a company. If you are part of a company, you may
							suggest modifications about the company you are assigned to.
						</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Get Involved!</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="ecsc"
							title={"European Cyber Security Challenge"}
							icon={"fas fa-trophy"}
						/>
						<ShadowBox
							link="breakfast"
							title={"CYBERSECURITY Breakfast"}
							icon={"fas fa-mug-hot"}
							abstract={"Become partner of the month!"}
						/>
						<ShadowBox
							link="cybersecurityweek"
							title={"CYBERSECURITY Week Luxembourg"}
							icon={"fas fa-plug"}
							abstract={"happening in 17-21 Oct 2022. Watch out for a brand new concept!"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cyber4growth"
							title={"Cyber4Growth"}
							icon={"fas fa-rocket"}
						/>
						<ShadowBox
							link="events"
							title={"Events"}
							icon={"fas fa-calendar-alt"}
							abstract={"Take a look at the calendar and get in touch if you want to join the Luxembourg delegation!"}
						/>
						<ShadowBox
							link={getPrivateAppURL()}
							title={"Private space"}
							icon={"fas fa-key"}
							abstract={"Contribute to the content of the CYBERLUX platform and make sure your organization gets the visibility it deserves!"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
