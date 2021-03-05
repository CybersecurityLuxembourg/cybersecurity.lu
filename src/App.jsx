import React from "react";
import "./App.css";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { BrowserRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import InsideApp from "./component/InsideApp";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
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

export default withCookies(App);
