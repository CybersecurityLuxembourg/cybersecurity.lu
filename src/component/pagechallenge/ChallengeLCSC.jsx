import React from "react";
import "./ChallengeLCSC.css";

export default class ChallengeLCSC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="ChallengeLCSC" className="row">
				<div className="col-md-12">
					<h2>Lëtz Cybersecurity Challenge - The national challenge is back!</h2>
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
						className="ChallengeLCSC-image"
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
		);
	}
}
