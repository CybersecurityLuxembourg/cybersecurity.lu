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

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.getAnalytics = this.getAnalytics.bind(this);

		this.state = {
			analytics: null,
		};
	}

	componentDidMount() {
		this.getAnalytics();

		/* eslint-disable */
		(function(m, a, i, l, e, r) {
			m["MailerLiteObject"] = e;
			function f(){
				const c = {
					a: arguments,
					q: []
				};

				const r = this.push(c);
				return "number" !== typeof r ? r : f.bind(c.q);
			}
			f.q = f.q || [];
			m[e] = m[e] || f.bind(f.q);
			m[e].q = m[e].q || f.q;
			r = a.createElement(i);
			const _ = a.getElementsByTagName(i)[0];
			r.async = 1;
			r.src = l + "?v" + (~~(new Date().getTime()/1000000));
			_.parentNode.insertBefore(r, _);
		})(window, document, "script", "https://static.mailerlite.com/js/universal.js", "ml");

		const ml_account = ml("accounts", "2758498", "t7f8b8i6b8", "load");
		const ml_webform_3328240 = ml_account("webforms", "3328240", "r1e0z6", "load");

		ml_webform_3328240("animation", "fadeIn");
		/* eslint-enable */
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
							render={(props) => <PageSearch {...props} taxonomy={this.state.taxonomy}/>}
						/>
						<Route
							path="/about"
							render={(props) => <PageAbout {...props} />}
						/>
						<Route path="/" render={(props) => <PageHome
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
