import React from "react";
import "./ShadowBoxECSC.css";
import { Link } from "react-router-dom";

export default class ShadowBoxECSC extends React.Component {
	getColor() {
		if (this.props.color) {
			return this.props.color;
		}

		return "blue";
	}

	render() {
		return (
			<div className={"shadow-section " + this.getColor() + "-shadow-section centered-shadow-section"}>
				<Link to="challenge">
					<div>
						<h3>Luxembourg Challenge</h3>
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
