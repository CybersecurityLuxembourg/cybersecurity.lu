import React from "react";
import "./PageBestPractices.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Tab from "./tab/Tab.jsx";
import BestPracticesPage from "./pagebestpractices/BestPracticesPage.jsx";
import { getUrlParameter } from "../utils/url.jsx";
import Loading from "./box/Loading.jsx";

export default class PageBestPractices extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tabs: null,
			taxonomyValues: null,
			selectedMenu: null,
		};
	}

	componentDidMount() {
		if (getUrlParameter("tab") !== null && this.state.tabs
			&& this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}

		this.getBestPracticesTaxonomy();
	}

	componentDidUpdate(prevProps) {
		if (this.state.selectedMenu !== getUrlParameter("tab")
			&& this.state.tabs.indexOf(getUrlParameter("tab")) >= 0) {
			this.setState({ selectedMenu: getUrlParameter("tab") });
		}

		if (!prevProps.analytics && this.props.analytics) {
			this.getBestPracticesTaxonomy();
		}
	}

	getBestPracticesTaxonomy() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "BEST PRACTICE");

			this.setState({
				tabs: values.map((v) => v.name.toLowerCase().replace(" ", "_")),
				taxonomyValues: values,
			});
		}
	}

	onMenuClick(m) {
		this.props.history.push("?tab=" + m);
	}

	render() {
		return (
			<div id="PageBestPractices" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/practices">BEST PRACTICES</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				{this.state.tabs && this.state.taxonomyValues
					? <Tab
						onMenuClick={() => this.onMenuClick()}
						selectedMenu={this.state.selectedMenu}
						labels={this.state.taxonomyValues.map((v) => v.name)}
						keys={this.state.tabs}
						content={this.state.taxonomyValues.map((l) => (
							<BestPracticesPage
								taxonomyValue={l}
								key={l.name}
								analytics={this.props.analytics}
							/>
						))}
					/>
					: <Loading
						height={300}
					/>
				}
			</div>
		);
	}
}
