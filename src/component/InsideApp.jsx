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
import PageMarketplace from "./PageMarketplace.jsx";
import PageCalendar from "./PageCalendar.jsx";
import PageStrategy from "./PageStrategy.jsx";
import PageArticle from "./PageArticle.jsx";
import PageEvent from "./PageEvent.jsx";
import PageTool from "./PageTool.jsx";
import PageJobOffer from "./PageJobOffer.jsx";
import PageService from "./PageService.jsx";
import PageAbout from "./PageAbout.jsx";
import PageCyber4Growth from "./PageCyber4Growth.jsx";
import PageCyberWeek from "./PageCyberWeek.jsx";
import PageBreakfast from "./PageBreakfast.jsx";
import PageSearch from "./PageSearch.jsx";
import PageHelp from "./PageHelp.jsx";
import PageDashboard from "./PageDashboard.jsx";
import PagePrivateSector from "./PagePrivateSector.jsx";
import PageMap from "./PageMap.jsx";
import PageCompany from "./PageCompany.jsx";
import PagePublicSector from "./PagePublicSector.jsx";
import PageCivilSociety from "./PageCivilSociety.jsx";
import PageEducation from "./PageEducation.jsx";
import PageNewsletter from "./PageNewsletter.jsx";
import getMailerliteFunction from "../utils/mailerlite.jsx";

export default class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.getAnalytics = this.getAnalytics.bind(this);

		this.state = {
			analytics: null,
			ml_account: getMailerliteFunction(),
			privateSectorCount: null,
			publicSectorCount: null,
			civilSocietyCount: null,
		};
	}

	componentDidMount() {
		this.getAnalytics();
		this.getCounts();
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

	getCounts() {
		getRequest.call(this, "public/get_public_companies"
			+ "?count=true&ecosystem_role=ACTOR&entity_type=PRIVATE SECTOR", (data) => {
			this.setState({
				privateSectorCount: data.count,
			});

			getRequest.call(this, "public/get_public_companies"
			+ "?count=true&entity_type=PUBLIC SECTOR", (data2) => {
				this.setState({
					publicSectorCount: data2.count,
				});

				getRequest.call(this, "public/get_public_companies"
					+ "?count=true&ecosystem_role=ACTOR&entity_type=CIVIL SOCIETY", (data3) => {
					this.setState({
						civilSocietyCount: data3.count,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
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
					analytics={this.state.analytics}
					ml_account={this.state.ml_account}
					privateSectorCount={this.state.privateSectorCount}
					publicSectorCount={this.state.publicSectorCount}
					civilSocietyCount={this.state.civilSocietyCount}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
						<Route path="/calendar/:handle" render={(props) => <PageEvent {...props} />}/>
						<Route path="/tool/:handle" render={(props) => <PageTool {...props} />}/>
						<Route path="/job_offer/:handle" render={(props) => <PageJobOffer {...props} />}/>
						<Route path="/service/:handle" render={(props) => <PageService {...props} />}/>
						<Route path="/company/:id" render={(props) => <PageCompany {...props} analytics={this.state.analytics} />}/>

						<Route path="/help" render={(props) => <PageHelp {...props}/>}/>

						<Route
							path="/news"
							render={(props) => <PageNews
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/calendar"
							render={(props) => <PageCalendar
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/strategy"
							render={(props) => <PageStrategy
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/cyber4growth"
							render={(props) => <PageCyber4Growth
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/cybersecurityweek"
							render={(props) => <PageCyberWeek
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/breakfast"
							render={(props) => <PageBreakfast
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/marketplace"
							render={(props) => <PageMarketplace
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/privatesector"
							render={(props) => <PagePrivateSector
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/publicsector"
							render={(props) => <PagePublicSector
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/civilsociety"
							render={(props) => <PageCivilSociety
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/education"
							render={(props) => <PageEducation
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/dashboard"
							render={(props) => <PageDashboard
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/map"
							render={(props) => <PageMap
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/search"
							render={(props) => <PageSearch
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/about"
							render={(props) => <PageAbout
								{...props}
							/>}
						/>
						<Route
							path="/newsletter"
							render={(props) => <PageNewsletter
								ml_account={this.state.ml_account}
								{...props}
							/>}
						/>

						<Route
							path="/"
							render={(props) => <PageHome
								ml_account={this.state.ml_account}
								analytics={this.state.analytics}
								privateSectorCount={this.state.privateSectorCount}
								publicSectorCount={this.state.publicSectorCount}
								civilSocietyCount={this.state.civilSocietyCount}
								{...props}
							/>}
						/>
					</Switch>
				</div>
				<Footer/>
			</div>
		);
	}
}
