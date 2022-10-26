import React from "react";
import "./PageCyberWeek.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getUrlParameter } from "../utils/url.jsx";
import Tab from "./tab/Tab.jsx";
import CyberWeekPresentation from "./pagecyberweek/CyberWeekPresentation.jsx";
import CyberWeekExperience from "./pagecyberweek/CyberWeekExperience.jsx";
import CyberWeekPhotos from "./pagecyberweek/CyberWeekPhotos.jsx";
import CyberWeekReplays from "./pagecyberweek/CyberWeekReplays.jsx";
import CyberWeekProgramme from "./pagecyberweek/CyberWeekProgramme.jsx";
import CyberWeekConferenceStream from "./pagecyberweek/CyberWeekConferenceStream.jsx";
import CyberWeekExhibitionArea from "./pagecyberweek/CyberWeekExhibitionArea.jsx";
import CyberWeekSponsors from "./pagecyberweek/CyberWeekSponsors.jsx";
import CyberWeekSponsor from "./pagecyberweek/CyberWeekSponsor.jsx";
import CyberWeekNetwork from "./pagecyberweek/CyberWeekNetwork.jsx";
import CyberWeekPitching from "./pagecyberweek/CyberWeekPitching.jsx";
import CyberWeekBecomeASponsor from "./pagecyberweek/CyberWeekBecomeASponsor.jsx";
import CyberWeekGala from "./pagecyberweek/CyberWeekGala.jsx";
import CyberWeekAboutTheGala from "./pagecyberweek/CyberWeekAboutTheGala.jsx";
import CyberWeekTheAwards from "./pagecyberweek/CyberWeekTheAwards.jsx";
import CyberWeekContactUs from "./pagecyberweek/CyberWeekContactUs.jsx";
import CyberWeekRegister from "./pagecyberweek/CyberWeekRegister.jsx";
import CyberWeekLDIH from "./pagecyberweek/CyberWeekLDIH.jsx";

export default class PageCyberWeek extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: [
				"About",
				"Experience",
				"Photos",
				"Replays",
				"Programme",
				"Conference_stream",
				"Exhibition_area",
				"Network",
				"Pitching_session",
				"LDIH",
				"Sponsoring",
				"Become_a_sponsor",
				"Sponsors",
				"Gala",
				"About_the_gala",
				"The_awards",
				"Contact",
				"Register",
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
			<div id="PageCyberWeek" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/cybersecurityweek">CYBERSECURITY WEEK LUXEMBOURG</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<Tab
							onMenuClick={(m) => this.onMenuClick(m)}
							selectedMenu={this.state.selectedMenu}
							labels={[
								"About CSWL 2022",
								"CSWL Experience",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Photos</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Replays</div>",
								"Programme",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Conference stream</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Exhibition area</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Network</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Pitching session</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- L-DIH ON TOUR</div>",
								"Sponsors",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Become a sponsor</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- Sponsors</div>",
								"Gala & Awards Night",
								"<div style='font-size:12px'>&nbsp;&nbsp;- About the Gala</div>",
								"<div style='font-size:12px'>&nbsp;&nbsp;- The Awards</div>",
								"Contact us",
								"Register",
							]}
							keys={this.state.tabs}
							content={[
								<CyberWeekPresentation
									key={this.state.tabs[0]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekExperience
									key={this.state.tabs[1]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekPhotos
									key={this.state.tabs[2]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekReplays
									key={this.state.tabs[3]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekProgramme
									key={this.state.tabs[4]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekConferenceStream
									key={this.state.tabs[5]}
									analytics={this.props.analytics}
									{...this.props}
								/>,
								<CyberWeekExhibitionArea
									key={this.state.tabs[6]}
									analytics={this.props.analytics}
									{...this.props}
								/>,
								<CyberWeekNetwork
									key={this.state.tabs[7]}
									{...this.props}
								/>,
								<CyberWeekPitching
									key={this.state.tabs[8]}
									{...this.props}
								/>,
								<CyberWeekLDIH
									key={this.state.tabs[9]}
									{...this.props}
								/>,
								<CyberWeekSponsor
									key={this.state.tabs[10]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekBecomeASponsor
									key={this.state.tabs[11]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekSponsors
									key={this.state.tabs[12]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekGala
									key={this.state.tabs[13]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekAboutTheGala
									key={this.state.tabs[14]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekTheAwards
									key={this.state.tabs[15]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekContactUs
									key={this.state.tabs[16]}
									analytics={this.props.analytics}
								/>,
								<CyberWeekRegister
									key={this.state.tabs[17]}
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
