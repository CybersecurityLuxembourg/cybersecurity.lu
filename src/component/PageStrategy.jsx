import React from "react";
import "./PageStrategy.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Tab from "./tab/Tab.jsx";
import StrategieNational from "./pagestrategy/StrategieNational.jsx";
import FrameworkPage from "./pagestrategy/FrameworkPage.jsx";
import { getUrlParameter } from "../utils/url.jsx";

export default class PageStrategy extends React.Component {
	constructor(props) {
		super(props);

		this.onMenuClick = this.onMenuClick.bind(this);

		this.state = {
			tabs: [
				"NationalStrategy",
				"NationalFramework",
				"EuropeanFramework",
				"EuropeanFrameworkForFinancialSector",
				"EuropeanFrameworkUnderNegociation",
				"InternationalFramework",
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
			<div className={"PageStrategy page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/strategy">STRATEGY</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<Tab
					onMenuClick={this.onMenuClick}
					selectedMenu={this.state.selectedMenu}
					labels={[
						"National Strategy",
						"National framework",
						"European framework",
						"<div style='font-size:12px'>&nbsp;&nbsp;- For the financial sector</div>",
						"<div style='font-size:12px'>&nbsp;&nbsp;- Upcoming/under negotiation</div>",
						"International framework",
					]}
					keys={this.state.tabs}
					content={[
						<StrategieNational
							key={this.state.tabs[0]}
						/>,
						<FrameworkPage
							taxonomyValueName={"NATIONAL FRAMEWORK"}
							key={this.state.tabs[1]}
							analytics={this.props.analytics}
						/>,
						<FrameworkPage
							taxonomyValueName={"EUROPEAN FRAMEWORK"}
							key={this.state.tabs[2]}
							analytics={this.props.analytics}
						/>,
						<FrameworkPage
							taxonomyValueName={"EUROPEAN FRAMEWORK - For the financial sector"}
							key={this.state.tabs[3]}
							analytics={this.props.analytics}
						/>,
						<FrameworkPage
							taxonomyValueName={"EUROPEAN FRAMEWORK - Upcoming/under negotiation"}
							key={this.state.tabs[4]}
							analytics={this.props.analytics}
						/>,
						<FrameworkPage
							taxonomyValueName={"INTERNATIONAL FRAMEWORK"}
							key={this.state.tabs[5]}
							analytics={this.props.analytics}
						/>,
					]}
				/>
			</div>
		);
	}
}
