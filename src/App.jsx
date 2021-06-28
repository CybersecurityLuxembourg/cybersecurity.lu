import React from "react";
import "./App.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import InsideApp from "./component/InsideApp.jsx";
import { getApiURL } from "./utils/env.jsx";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidMount() {
		document.getElementById("favicon").href = getApiURL() + "public/get_image/favicon.ico";
	}

	render() {
		return (
			<div id="App">
				<BrowserRouter>
					<InsideApp {...this.props}/>
					<NotificationContainer/>
				</BrowserRouter>
			</div>
		);
	}
}
