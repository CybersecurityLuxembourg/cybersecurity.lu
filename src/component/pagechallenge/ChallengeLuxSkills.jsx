import React from "react";
import "./ChallengeLuxSkills.css";

export default class ChallengeLuxSkills extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="ChallengeLuxSkills" className="row">
				<div className="col-md-12">
					<h2>LuxSkills</h2>
				</div>

				<div className="col-md-12 row-spaced">
					<h3>
						Some text
					</h3>
				</div>
			</div>
		);
	}
}
