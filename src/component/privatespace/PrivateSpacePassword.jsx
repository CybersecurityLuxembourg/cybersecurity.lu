import React from 'react';
import './PrivateSpacePassword.css';
import FormLine from '../form/FormLine';
import Loading from "../box/Loading";
import Info from "../box/Info";
import {postRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Company from "../item/Company";
import {validatePassword} from '../../utils/re';


export default class PrivateSpacePassword extends React.Component {

	constructor(props){
		super(props);

		this.changePassword = this.changePassword.bind(this);

		this.state = {
			password: null,
			newPassword: null,
			newPasswordConfirmation: null,
		}
	}

	componentDidMount() {
	}

	refresh() {
	}

	changePassword() {
		let params = {
			password: this.state.password,
			new_password: this.state.newPassword
		}

		postRequest.call(this, "account/change_password", params, data => {
            this.setState({
                password: null,
				newPassword: null,
				newPasswordConfirmation: null,
            });
            nm.info("The password has been changed");
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	render() {
		return (
			<div className="PrivateSpacePassword">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Change password</h2>
					</div>

					{this.props.id !== null ?
                        <div className="col-md-12">
                            <FormLine
                                label={"Current password"}
                                value={this.state.password}
                                onChange={v => this.setState({ "password": v })}
                        		format={validatePassword}
                        		type={"password"}
                            />
                            <Info
                                content={
                                    <div>
                                        The password must:<br/>
                                        <li>contain at least 1 lowercase alphabetical character</li>
                                        <li>contain at least 1 uppercase alphabetical character</li>
                                        <li>contain at least 1 numeric character</li>
                                        <li>contain at least 1 special character such as !@#$%^&*</li>
                                        <li>be between 8 and 30 characters long</li>
                                    </div>
                                }
                            />
                            <FormLine
                                label={"New password"}
                                value={this.state.newPassword}
                                onChange={v => this.setState({ "newPassword": v })}
                        		format={validatePassword}
                        		type={"password"}
                            />
                            <FormLine
                                label={"New password confirmation"}
                                value={this.state.newPasswordConfirmation}
                                onChange={v => this.setState({ "newPasswordConfirmation": v })}
                        		format={validatePassword}
                        		type={"password"}
                            />
                            <div className="right-buttons">
	                        	<button
	                        		onClick={() => this.changePassword()}
	                        		disabled={!validatePassword(this.state.password) ||
	                        			!validatePassword(this.state.newPassword) ||
	                        			!validatePassword(this.state.newPasswordConfirmation) ||
	                        			this.state.newPassword !== this.state.newPasswordConfirmation}>
	                        		Change password
	                        	</button>
	                        </div>
                        </div>
                    :
                        <Loading
                        	height={150}
                        />
                    }
				</div>
			</div>
		);
	}
}