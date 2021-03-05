import React from "react";
import "./InsideApp.css";
import {NotificationManager as nm} from 'react-notifications';
import GovBar from "./bar/GovBar";
import Menu from "./bar/Menu";
import Footer from "./bar/Footer";
import PageHome from "./PageHome";
import PageNews from "./PageNews";
import PageAbout from "./PageAbout";
import PageEcosystem from "./PageEcosystem";
import PageJobs from "./PageJobs";
import PageJob from "./PageJob";
import PageCalendar from "./PageCalendar";
import PageArticle from "./PageArticle";
import PageCompany from "./PageCompany";
import PageEvent from "./PageEvent";
import PageMap from "./PageMap";
import PageLogin from "./PageLogin";
import PagePrivateSpace from "./PagePrivateSpace";
import { Route, Switch } from "react-router-dom";
import Particles from 'react-particles-js';
import { getRequest } from '../utils/request';
import { getApiURL } from "../utils/env";
import { withCookies } from 'react-cookie';


export default class InsideApp extends React.Component {

	constructor(props) {
		super(props);

		this.changeState = this.changeState.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			logged: false,
			email: null
		}
	}

	componentWillMount() {
		getRequest.call(this, "privatespace/is_logged", data => {
			this.setState({
				logged: data.is_logged,
				email: data.email
			});
		}, response => {
		}, error => {
		});
	}

	login(token, email) {
		//TODO
		//this.props.cookies.set('access_token_cookie', token/*, { httpOnly: true }*/);
		window.token = token

		this.setState({ 
			logged: true,
			email: email
		})
	}

	logout() {
		//TODO
		//this.props.cookies.remove('access_token_cookie');
		window.token = undefined

		this.setState({ 
			logged: false,
			email: null
		})
	}

	changeState(field, value) {
		this.setState({[field]: value});
	}

	render() {
		return (
			<div id="InsideApp">
				<GovBar/>
				<Menu
					logged={this.state.logged}
					email={this.state.email}
				/>
				<div id="InsideApp-content">
					<Particles 
						params={{
							"particles": {
								"number": {
									"value": 50
								},
								"size": {
									"value": 4
								},
								"color": {
									"value": ["#009fe3", "#e40613"]
								},
								"shape": {
								  "type": "images",
								  "stroke": {
									"width": 0,
									"color": "black"
								  },
								  "images": [
									{
									  "src": "/favicon.ico",
									  "width": 1000,
									  "height": 1000
									},
								  ]
								},
								"move": {
								  "enable": true,
								  "speed": 0.2,
								},
								"opacity": {
									value: 0.1,
									anim: {
										enable: false
									}
								},
								"line_linked": {
								  "enable": true,
								  "distance": 150,
								  "color": {
									"value": "#000000"
								  },
								  "opacity": 0.1,
								  "width": 1
								},
							},
						}}
					/>
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/company/:id" render={(props) => <PageCompany {...props} />}/>
						<Route path="/calendar/:handle" render={(props) => <PageEvent {...props} />}/>
						<Route path="/jobs/:id" render={(props) => <PageJob {...props} />}/>

						<Route path="/news" render={(props) => <PageNews {...props} />}/>
						<Route path="/ecosystem" render={(props) => <PageEcosystem {...props} />}/>
						<Route path="/calendar" render={(props) => <PageCalendar {...props} />}/>
						<Route path="/ecosystem" render={(props) => <PageEcosystem {...props} />}/>
						<Route path="/jobs" render={(props) => <PageJobs {...props} />}/>
						<Route path="/about" render={(props) => <PageAbout {...props} />}/>
						<Route path="/login" render={(props) => 
							<PageLogin 
								login={this.login}
								{...props} 
							/>}
						/>
						<Route path="/privatespace" render={(props) => 
							<PagePrivateSpace 
								logout={this.logout}
								{...props} 
							/>}
						/>

						<Route path="/map" render={(props) => <PageMap {...props} />}/>

						<Route path="/" render={(props) => <PageHome {...props} />}/>
					</Switch>
				</div>
				<Footer/>
			</div>
		);
	}
}
