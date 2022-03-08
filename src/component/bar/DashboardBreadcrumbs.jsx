import React from "react";
import "./DashboardBreadcrumbs.css";

export default class DashboardBreadcrumbs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: true,
		};
	}

	// eslint-disable-next-line class-methods-use-this
	goToDiv(id) {
		const elmnt = document.getElementById(id);
		elmnt.scrollIntoView();
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"DashboardBreadcrumbs " + (this.state.open ? "DashboardBreadcrumbs-open" : "")}>
				<a
					className="DashboardBreadcrumbs-arrow"
					onClick={() => this.changeState("open", !this.state.open)}>
					{this.state.open ? <i className="fas fa-arrow-up"/> : <i className="fas fa-arrow-down"/>}
				</a>
				<div
					className="col-md-12 DashboardBreadcrumbs-company"
					onClick={() => this.goToDiv("PageDashboard-companies")}>
					<i className="fas fa-city"/> Companies
				</div>
				<div
					className="col-md-12 DashboardBreadcrumbs-strategy"
					onClick={() => this.goToDiv("PageDashboard-national-strategy")}>
					<i className="fas fa-chess"/> National strategy & governance
				</div>
				<div
					className="col-md-12 DashboardBreadcrumbs-national"
					onClick={() => this.goToDiv("PageDashboard-national-actors")}>
					<i className="fas fa-landmark"/> National actors
				</div>
			</div>
		);
	}
}
