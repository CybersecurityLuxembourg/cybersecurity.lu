import React from "react";
import "./ShadowBoxECSC.css";
import { Link } from "react-router-dom";

export default class ShadowBoxECSC extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="shadow-section black-shadow-section centered-shadow-section">
				<Link to="ecsc">
					<div>
						<h3>LCSC</h3>
						<i className="fas fa-trophy"/>
						<div>
							Participate in the national challenge to join the Luxembourg team
							at the European Cybersecurity Challenge 2022!
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
