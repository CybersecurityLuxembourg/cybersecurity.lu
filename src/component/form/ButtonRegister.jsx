import React, { Component } from "react";
import "./ButtonRegister.css";
import { getPrivateAppURL } from "../../utils/env.jsx";

export default class ButtonRegister extends Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<button
				className="ButtonRegister"
				onClick={() => window.open(getPrivateAppURL())}>
				<i className="fas fa-file-signature"/> Register your entity here
			</button>
		);
	}
}
