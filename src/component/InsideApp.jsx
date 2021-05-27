import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./PageHome.jsx";
import PageNews from "./PageNews.jsx";
import PageCalendar from "./PageCalendar.jsx";
import PageArticle from "./PageArticle.jsx";
import PageEvent from "./PageEvent.jsx";
import PageAbout from "./PageAbout.jsx";
import PageSearch from "./PageSearch.jsx";
import getMailerliteFunction from "../utils/mailerlite.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.getAnalytics = this.getAnalytics.bind(this);

		this.state = {
			analytics: null,
			ml_account: getMailerliteFunction(),
		};
	}

	componentDidMount() {
		this.getAnalytics();
	}

	getAnalytics() {
		getRequest.call(this, "public/get_public_analytics", (data) => {
			this.setState({
				analytics: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="InsideApp">
				<GovBar/>

				<Route path="/:path?" render={(props) => <Menu
					ml_account={this.state.ml_account}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/calendar/:handle" render={(props) => <PageEvent {...props} />}/>

						<Route path="/news" render={(props) => <PageNews
							analytics={this.state.analytics}
							{...props}
						/>}/>
						<Route path="/calendar" render={(props) => <PageCalendar
							analytics={this.state.analytics}
							{...props}
						/>}/>
						<Route
							path="/search"
							render={(props) => <PageSearch
								{...props}
								analytics={this.state.analytics}
							/>}
						/>
						<Route
							path="/about"
							render={(props) => <PageAbout {...props} />}
						/>
						<Route path="/" render={(props) => <PageHome
							ml_account={this.state.ml_account}
							analytics={this.state.analytics}
							{...props}
						/>}/>
					</Switch>
				</div>
				<Footer/>
			</div>
		);
	}
}
