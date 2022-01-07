import React from "react";
import "./PageCyberWeek.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getUrlParameter } from "../utils/url.jsx";
import Tab from "./tab/Tab.jsx";
import CyberWeekPresentation from "./pagecyberweek/CyberWeekPresentation.jsx";
import CyberWeekNews from "./pagecyberweek/CyberWeekNews.jsx";
import CyberWeekEvents from "./pagecyberweek/CyberWeekEvents.jsx";
import CyberWeekAwards from "./pagecyberweek/CyberWeekAwards.jsx";
import CyberWeekSponsors from "./pagecyberweek/CyberWeekSponsors.jsx";

export default class PageCyberWeek extends React.Component {
	constructor(props) {
		super(props);

		this.onMenuClick = this.onMenuClick.bind(this);

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

	componentDidMount() {
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
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/education">CYBERSECURITY WEEK LUXEMBOURG</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
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
					</div>
				</div>
			</div>
		);
	}
}
