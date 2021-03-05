import React from 'react';
import './PagePrivateSpace.css';
import {NotificationManager as nm} from 'react-notifications';
import Lock from "./box/Lock";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import { getRequest } from '../utils/request';
import Tab from './tab/Tab';
import PrivateSpaceAccount from './privatespace/PrivateSpaceAccount';
import PrivateSpaceMyCompanies from './privatespace/PrivateSpaceMyCompanies';
import PrivateSpaceRegisterACompany from './privatespace/PrivateSpaceRegisterACompany';
import PrivateSpaceRequest from './privatespace/PrivateSpaceRequest';
import PrivateSpacePassword from './privatespace/PrivateSpacePassword';


export default class PagePrivateSpace extends React.Component {

	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);

		this.state = {
		}
	}

	componentDidMount() {
		getRequest.call(this, "privatespace/is_logged", data => {
			if (data["is_logged"] !== true)
				this.props.history.push("/login");
		}, response => {
			nm.warning(response.statusText);
			this.props.history.push("/login");
		}, error => {
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
						<i class="fas fa-sign-out-alt"/> Log out
					</button>
				</div>

				<Tab
					menu={["My account", "My companies", null, "Register a company", "Request", null, "Password"]}
					content={[
						<PrivateSpaceAccount
							id={this.props.id}
						/>,
						<PrivateSpaceMyCompanies
							id={this.props.id}
						/>, 
						null,
						<PrivateSpaceRegisterACompany
							id={this.props.id}
						/>, 
						<PrivateSpaceRequest
							id={this.props.id}
						/>,
						null,
						<PrivateSpacePassword
							id={this.props.id}
						/>
					]}
				/>

			</div>
		);
	}
}