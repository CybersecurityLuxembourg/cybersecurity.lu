import React from 'react';
import './PagePrivateSpace.css';
import {NotificationManager as nm} from 'react-notifications';
import Lock from "./box/Lock";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import { getRequest } from '../utils/request';
import Tab from './tab/Tab';
import PrivateSpaceAccount from './privatespace/PrivateSpaceAccount';
import PrivateSpaceCompany from './privatespace/PrivateSpaceCompany';
import PrivateSpaceRequest from './privatespace/PrivateSpaceRequest';


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
                    menu={["Account", "Company", "Request"]}
                    content={[
                        <PrivateSpaceAccount
                            id={this.props.id}
                        />,
                        <PrivateSpaceCompany
                            id={this.props.id}
                        />, 
                        <PrivateSpaceRequest
                            id={this.props.id}
                        />
                    ]}
                />

            </div>
		);
	}
}