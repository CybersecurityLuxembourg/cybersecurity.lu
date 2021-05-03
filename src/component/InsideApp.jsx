import React from "react";
import "./InsideApp.css";
import { Route, Switch } from "react-router-dom";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./PageHome.jsx";
import PageNews from "./PageNews.jsx";
import PageCalendar from "./PageCalendar.jsx";
import PageArticle from "./PageArticle.jsx";
import PageEvent from "./PageEvent.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="InsideApp">
				<GovBar/>
				<Menu/>
				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/calendar/:handle" render={(props) => <PageEvent {...props} />}/>

						<Route path="/news" render={(props) => <PageNews {...props} />}/>
						<Route path="/calendar" render={(props) => <PageCalendar {...props} />}/>
						<Route path="/" render={(props) => <PageHome {...props} />}/>
					</Switch>
				</div>
				<Footer/>
			</div>
		);
	}
}
