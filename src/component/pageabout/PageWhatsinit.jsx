import React from "react";
import "./PageWhatsinit.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Tab from "../tab/Tab.jsx";
import WhatsinitEcosystemMember from "./pagewhatsinit/WhatsinitEcosystemMember.jsx";
import WhatsinitUser from "./pagewhatsinit/WhatsinitUser.jsx";
import { getUrlParameter } from "../../utils/url.jsx";

export default class PageWhatsinit extends React.Component {
	constructor(props) {
		super(props);

		this.onMenuClick = this.onMenuClick.bind(this);

		this.state = {
			tabs: [
				"EcosystemMembers",
				"Users",
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
			<div id="PageWhatsinit" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/whatsinit">What&apos;s in it for you?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<Tab
					onMenuClick={this.onMenuClick}
					selectedMenu={this.state.selectedMenu}
					labels={[
						"Ecosystem members",
						"Users",
					]}
					keys={this.state.tabs}
					content={[
						<WhatsinitEcosystemMember
							key={this.state.tabs[0]}
							analytics={this.props.analytics}
						/>,
						<WhatsinitUser
							key={this.state.tabs[1]}
							analytics={this.props.analytics}
						/>,
					]}
				/>
			</div>
		);
	}
}
