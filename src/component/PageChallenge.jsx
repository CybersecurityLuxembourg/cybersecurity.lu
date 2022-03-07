import React from "react";
import "./PageChallenge.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageChallenge extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageChallenge" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/challenge">LËTZ CYBERSECURITY CHALLENGE</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Lêtz Cybersecurity Challenge - The national challenge is back!</h1>
					</div>

					<div className="col-md-12 row-spaced">
						<h3>
							Save the date!
						</h3>

						<h3>
							Lëtz Cybersecurity Challenge will take place during
							LuxSkills competition from 04-06 May 2022.
						</h3>
					</div>

					<div className="col-md-4 offset-md-4">
						<img
							className="PageChallenge-image"
							src="img/letz-cyberchallenge.jpg"
							alt="Lëtz Cybersecurity Challenge logo"
						/>
					</div>

					<div className="col-md-12 row-spaced">
						<p>
							<h4>
								Take your chance to join the national team that will represent
								Luxembourg at the European Cybersecurity Challenge in Vienna,
								13-16 September 2022.
							</h4>
						</p>

						<p>
							<h4>All details to be unveiled soon! Stay tuned…</h4>
						</p>

						<p>
							<h4>Any questions so far? Contact <a href="mailto:info@cybersecurity-luxembourg.com">info@cybersecurity-luxembourg.com</a></h4>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
