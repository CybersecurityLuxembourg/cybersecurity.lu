import React from "react";
import "./InsideApp.css";
import {
	Route, Switch, Redirect, withRouter,
} from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import GovBar from "./bar/GovBar.jsx";
import Menu from "./bar/Menu.jsx";
import Footer from "./bar/Footer.jsx";
import PageHome from "./PageHome.jsx";
import PageNews from "./PageNews.jsx";
import PageJobs from "./PageJobs.jsx";
import PageCalendar from "./PageCalendar.jsx";
import PageStrategy from "./pageabout/PageStrategy.jsx";
import PageNewsArticle from "./pagearticle/PageNewsArticle.jsx";
import PageEvent from "./pagearticle/PageEvent.jsx";
import PageTool from "./pagearticle/PageTool.jsx";
import PageJobOffer from "./pagearticle/PageJobOffer.jsx";
import PageService from "./pagearticle/PageService.jsx";
import PageCyber4Growth from "./PageCyber4Growth.jsx";
import PageCyberWeek from "./PageCyberWeek.jsx";
import PageBreakfast from "./PageBreakfast.jsx";
import PageSearch from "./PageSearch.jsx";
import PageHelp from "./PageHelp.jsx";
import PageDashboard from "./PageDashboard.jsx";
import PagePrivateSector from "./PagePrivateSector.jsx";
import PageMap from "./PageMap.jsx";
import PageEntity from "./PageEntity.jsx";
import PagePublicSector from "./PagePublicSector.jsx";
import PageCivilSociety from "./PageCivilSociety.jsx";
import PageEducation from "./PageEducation.jsx";
import PageNewsletter from "./PageNewsletter.jsx";
import PageCSB from "./PageCSB.jsx";
import PageLTAC from "./PageLTAC.jsx";
import PageTOTM from "./PageTOTM.jsx";
import PageChallenge from "./PageChallenge.jsx";
/* import PageCVE from "./PageCVE.jsx"; */
import PageBestPractices from "./PageBestPractices.jsx";
import PagePodcasts from "./PagePodcasts.jsx";
import PageCyberRange from "./PageCyberRange.jsx";
import PageFrameworks from "./PageFrameworks.jsx";
import PageInitiative from "./pageabout/PageInitiative.jsx";
import PageWhatsinit from "./pageabout/PageWhatsinit.jsx";
import PageResources from "./pagemenu/PageResources.jsx";
import PageAbout from "./pagemenu/PageAbout.jsx";
import PageEcosystem from "./pagemenu/PageEcosystem.jsx";
import PageGetInvolved from "./pagemenu/PageGetInvolved.jsx";
import PageWhatsup from "./pagemenu/PageWhatsup.jsx";
import Page404 from "./Page404.jsx";

class InsideApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			analytics: null,
			unlisten: null,
		};
	}

	// eslint-disable-next-line react/no-deprecated
	/* componentWillMount() {
		this.setState({
			unlisten: this.props.history.listen((location) => {
				// eslint-disable-next-line no-multi-assign,no-underscore-dangle
				const paq = window._paq = window._paq || [];
				paq.push(["setCustomUrl", location.pathname + location.search]);
				paq.push(["trackPageView"]);
			}),
		});
	}

	componentWillUnmount() {
		this.state.unlisten();
	} */

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
					analytics={this.state.analytics}
					{...props}
				/>}/>

				<div id="InsideApp-content">
					<Switch>
						<Route path="/news/:handle" render={(props) => <PageNewsArticle {...props} />}/>
						<Route path="/event/:handle" render={(props) => <PageEvent {...props} />}/>
						<Route path="/tool/:handle" render={(props) => <PageTool {...props} />}/>
						<Route path="/job/:handle" render={(props) => <PageJobOffer {...props} />}/>
						<Route path="/service/:handle" render={(props) => <PageService {...props} />}/>
						<Route path="/entity/:id" render={(props) => <PageEntity {...props} analytics={this.state.analytics} />}/>

						<Route path="/resources" render={(props) => <PageResources {...props} />}/>
						<Route path="/about" render={(props) => <PageAbout {...props} />}/>
						<Route path="/ecosystem" render={(props) => <PageEcosystem {...props} />}/>
						<Route path="/get_involved" render={(props) => <PageGetInvolved {...props} />}/>
						<Route path="/whatsup" render={(props) => <PageWhatsup {...props} />}/>

						<Route path="/help" render={(props) => <PageHelp {...props}/>}/>

						<Route
							path="/news"
							render={(props) => <PageNews
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/breakfast"
							render={(props) => <PageCSB
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/events"
							render={(props) => <PageCalendar
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/ltac"
							render={(props) => <PageLTAC
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/topic"
							render={(props) => <PageTOTM
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
							path="/jobs"
							render={(props) => <PageJobs
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
							path="/newsletter"
							render={(props) => <PageNewsletter
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/challenge"
							render={(props) => <PageChallenge
								{...props}
							/>}
						/>
						<Route
							path="/cyberrange"
							render={(props) => <PageCyberRange
								{...props}
							/>}
						/>
						<Route
							path="/practices"
							render={(props) => <PageBestPractices
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						{/* <Route
							path="/cve"
							render={(props) => <PageCVE
								{...props}
							/>}
						/> */}
						<Route
							path="/podcasts"
							render={(props) => <PagePodcasts
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/frameworks"
							render={(props) => <PageFrameworks
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/whatsinit"
							render={(props) => <PageWhatsinit
								analytics={this.state.analytics}
								{...props}
							/>}
						/>
						<Route
							path="/initiative"
							render={(props) => <PageInitiative
								{...props}
							/>}
						/>

						<Route
							exact
							path="/"
							render={(props) => <PageHome
								analytics={this.state.analytics}
								{...props}
							/>}
						/>

						{/* REDIRECTIONS */}

						<Route exact path="/gala">
							<Redirect to="/cybersecurityweek?tab=About_the_gala" />
						</Route>

						<Route exact path="/company/:id">
							<Redirect to="/entity/:id" />
						</Route>

						{/* 404 */}

						<Route
							render={(props) => <Page404
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

export default withRouter(InsideApp);
