import React from "react";
import "./PageCyber4Growth.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Tab from "./tab/Tab.jsx";
import Cyber4GrowthPresentation from "./pagecyber4growth/Cyber4GrowthPresentation.jsx";
import Cyber4GrowthProgram from "./pagecyber4growth/Cyber4GrowthProgram.jsx";
import Cyber4GrowthServices from "./pagecyber4growth/Cyber4GrowthServices.jsx";
import Cyber4GrowthLaureates2022 from "./pagecyber4growth/Cyber4GrowthLaureates2022.jsx";
import { getUrlParameter } from "../utils/url.jsx";

export default class PageCyber4Growth extends React.Component {
	constructor(props) {
		super(props);

		this.onMenuClick = this.onMenuClick.bind(this);

		this.state = {
			tabs: [
				"presentation",
				"programs",
				"services",
				"participants",
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
			<div className={"PageCyber4Growth page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/cyber4growth">CYBER4GROWTH</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<Tab
					onMenuClick={this.onMenuClick}
					selectedMenu={this.state.selectedMenu}
					labels={[
						"Presentation",
						"Programs",
						"Services",
						"Participants of 2022",
					]}
					keys={this.state.tabs}
					content={[
						<Cyber4GrowthPresentation
							analytics={this.props.analytics}
							key={this.state.tabs[0]}
						/>,
						<Cyber4GrowthProgram
							analytics={this.props.analytics}
							key={this.state.tabs[1]}
						/>,
						<Cyber4GrowthServices
							analytics={this.props.analytics}
							key={this.state.tabs[2]}
						/>,
						<Cyber4GrowthLaureates2022
							analytics={this.props.analytics}
							key={this.state.tabs[3]}
						/>,
					]}
				/>
			</div>
		);
	}
}
