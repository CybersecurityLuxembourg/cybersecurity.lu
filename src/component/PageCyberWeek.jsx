import React from "react";
import "./PageCyberWeek.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
/* import { getUrlParameter } from "../utils/url.jsx";
import Tab from "./tab/Tab.jsx";
import CyberWeekPresentation from "./pagecyberweek/CyberWeekPresentation.jsx";
import CyberWeekNews from "./pagecyberweek/CyberWeekNews.jsx";
import CyberWeekEvents from "./pagecyberweek/CyberWeekEvents.jsx";
import CyberWeekAwards from "./pagecyberweek/CyberWeekAwards.jsx";
import CyberWeekSponsors from "./pagecyberweek/CyberWeekSponsors.jsx"; */

export default class PageCyberWeek extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				"Presentation",
				"News",
				"Events",
				"Sponsors",
				"Awards",
			],
			selectedMenu: null,
		};
	}

	/* componentDidMount() {
		if (getUrlParameter("tab") !== null && this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	componentDidUpdate() {
		if (this.state.selectedMenu !== getUrlParameter("tab")
			&& this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	} */

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageCyberWeek" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/education">CYBERSECURITY WEEK LUXEMBOURG</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<h1>CYBERSECURITY WEEK LUXEMBOURG</h1>
					</div>

					<div className="col-md-12 row-spaced">
						<h3>Save the date!</h3>
					</div>

					<div className="col-md-8 offset-md-2 row-spaced">
						<img
							className="PageCyberWeek-image"
							src="img/cswl_2022.png"
							alt="CSWL 2022"
						/>
					</div>

					<div className="col-md-12 row-spaced">
						<p>
							<h4>This year, CYBERSECURITY Week Luxembourg will be revamped and
							will come up with a brand-new programme.</h4>
						</p>

						<p>
							<h4>Keep posted, more information will be unveiled and shared with you very soon!</h4>
						</p>
					</div>

					{/* <div className="col-md-12">
						<Tab
							onMenuClick={this.onMenuClick}
							selectedMenu={this.state.selectedMenu}
							labels={[
								"Presentation",
								"News",
								"Events",
								"Sponsors",
								"Awards",
							]}
							keys={this.state.tabs}
							content={[
								<CyberWeekPresentation
									key={this.state.tabs[0]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekNews
									key={this.state.tabs[1]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekEvents
									key={this.state.tabs[2]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekSponsors
									key={this.state.tabs[3]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekAwards
									key={this.state.tabs[4]}
									analytics={this.props.analytics}
								/>,
							]}
						/>
					</div> */}
				</div>
			</div>
		);
	}
}
