import React from "react";
import "./PagePrivateSpace.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Tab from "./tab/Tab.jsx";
import PrivateSpaceAccount from "./privatespace/PrivateSpaceAccount.jsx";
import PrivateSpaceMyCompanies from "./privatespace/PrivateSpaceMyCompanies.jsx";
import PrivateSpaceRegisterACompany from "./privatespace/PrivateSpaceRegisterACompany.jsx";
import PrivateSpaceRequest from "./privatespace/PrivateSpaceRequest.jsx";
import PrivateSpacePassword from "./privatespace/PrivateSpacePassword.jsx";

export default class PagePrivateSpace extends React.Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);

		this.state = {
		};
	}

	componentDidMount() {
		getRequest.call(this, "privatespace/is_logged", (data) => {
			if (data !== null && data.is_logged !== true) {
				this.props.history.push("/login");
			}
		}, (response) => {
			nm.warning(response.statusText);
			this.props.history.push("/login");
		}, (error) => {
			nm.error(error.message);
		});
	}

	logout() {
		this.props.logout();
		this.props.history.push("/");
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/privatespace">PRIVATE SPACE</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="PagePrivateSpace-buttons right-buttons">
					<button
						onClick={() => this.logout()}>
						<i className="fas fa-sign-out-alt"/> Log out
					</button>
				</div>

				<Tab
					menu={["My account", "My companies", null, "Register a company", "Request", null, "Password"]}
					content={[
						<PrivateSpaceAccount
							key={1}
							id={this.props.id}
						/>,
						<PrivateSpaceMyCompanies
							key={2}
							id={this.props.id}
						/>,
						null,
						<PrivateSpaceRegisterACompany
							key={3}
							id={this.props.id}
						/>,
						<PrivateSpaceRequest
							key={4}
							id={this.props.id}
						/>,
						null,
						<PrivateSpacePassword
							key={5}
							id={this.props.id}
						/>,
					]}
				/>
			</div>
		);
	}
}
