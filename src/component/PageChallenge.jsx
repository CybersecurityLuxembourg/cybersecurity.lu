import React from "react";
import "./PageEducation.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { getUrlParameter } from "../utils/url.jsx";
import Tab from "./tab/Tab.jsx";
import ChallengeLCSC from "./pagechallenge/ChallengeLCSC.jsx";
import ChallengeRegister from "./pagechallenge/ChallengeRegister.jsx";

export default class PageEducation extends React.Component {
	constructor(props) {
		super(props);

		this.onMenuClick = this.onMenuClick.bind(this);

		this.state = {
			tabs: [
				"Letz_Cybersecurity_Challenge",
				"How_to_register",
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
							<Breadcrumb.Item><Link to="/challenge">LËTZ CYBERSECURITY CHALLENGE</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>

					<div className="col-md-12">
						<Tab
							onMenuClick={this.onMenuClick}
							selectedMenu={this.state.selectedMenu}
							labels={[
								"Lëtz Cybersecurity Challenge",
								"How to register",
							]}
							keys={this.state.tabs}
							content={[
								<ChallengeLCSC
									key={this.state.tabs[0]}
									analytics={this.props.analytics}
								/>,
								<ChallengeRegister
									key={this.state.tabs[1]}
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
