import React from "react";
import "./WhatsinitUser.css";
import { Link } from "react-router-dom";
import ShadowBox from "../../box/ShadowBox.jsx";
import ShadowBoxPcDoctor from "../../box/ShadowBoxPcDoctor.jsx";

export default class WhatsinitUser extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"WhatsinitUser page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>What&apos;s in it for you? – Users</h1>
					</div>

					<div className="col-md-12 row-spaced">
						<img
							className={"WhatsinitEcosystemMember-member-image"}
							src="/img/user_page.jpg"
						/>
					</div>

					<div className="col-md-12">
						<p>
							You are looking for information related to cybersecurity,
							released by Luxembourg entities? <b>You are at the right place</b>.
						</p>

						<p>
							The national cybersecurity portal is the central information point
							of cybersecurity-related <Link to="jobs">news</Link>
							, <Link to="events">events</Link>, projects, programmes,
							and <Link to="jobs">jobs</Link>. It is an information portal presenting the ecosystem
							(the actors in the <Link to="privatesector">private sector</Link>,&nbsp;
							<Link to="publicsector">public sector</Link> and&nbsp;
							<Link to="civilsociety">civil society</Link>).
						</p>

						<p>
							It is also home of various <Link to="practices">resources</Link> to
							increase your cybersecurity maturity.
						</p>

						<p>
							Join live events to get the latest insights from cybersecurity
							experts (<Link to="breakfast">CYBERSECURITY Breakfast series</Link>,&nbsp;
							<Link to="cybersecurityweek">CYBERSECURITY Week Luxembourg</Link>).
						</p>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Information</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="news"
							title={"News"}
							icon={"fas fa-newspaper"}
						/>
						<ShadowBox
							link="practices"
							title={"Best practices"}
							icon={"fas fa-tasks"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="jobs"
							title={"Jobs"}
							icon={"fas fa-briefcase"}
						/>
						<ShadowBoxPcDoctor
							analytics={this.props.analytics}
						/>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Events</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="events"
							title={"Events"}
							icon={"fas fa-calendar-alt"}
							abstract={"Take a look at the calendar and get in touch if you want to join the Luxembourg delegation!"}
						/>
						<ShadowBox
							link="breakfast"
							title={"CYBERSECURITY Breakfast"}
							icon={"fas fa-mug-hot"}
							abstract={"Become partner of the month!"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cybersecurityweek"
							title={"CYBERSECURITY Week Luxembourg"}
							icon={"fas fa-plug"}
							abstract={"happening in 17-21 Oct 2022. Watch out for a brand new concept!"}
						/>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Projects and programs</h2>
					</div>

					<div className="col-md-6">
						<ShadowBox
							link="ecsc"
							title={"European Cyber Security Challenge"}
							icon={"fas fa-trophy"}
						/>
					</div>
					<div className="col-md-6">
						<ShadowBox
							link="cyber4growth"
							title={"Cyber4Growth"}
							icon={"fas fa-rocket"}
						/>
					</div>
				</div>
			</div>
		);
	}
}
