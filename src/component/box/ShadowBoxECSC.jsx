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
						<h3>ECSC</h3>
						<i className="fas fa-trophy"/>
						<div>
							Check out the European Cyber Security Challenge happening on
							from 13 to 16 of September!
						</div>
					</div>
				</Link>
			</div>
		);
	}
}
