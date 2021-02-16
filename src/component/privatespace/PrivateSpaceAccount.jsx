import React from 'react';
import './PrivateSpaceAccount.css';
import FormLine from '../form/FormLine';
import Loading from "../box/Loading";
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';


export default class PrivateSpaceAccount extends React.Component {

	constructor(props){
		super(props);

		this.refresh = this.refresh.bind(this);

		this.state = {
			user: null
		}
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.setState({
			user: null
		});

		getRequest.call(this, "privatespace/get_my_user", data => {
            this.setState({
                user: data,
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	render() {
		return (
			<div className="PrivateSpaceAccount">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Account</h2>
					</div>

					{this.state.user !== null ?
						<div className="col-md-12">
							<FormLine
		                        label={"Email"}
		                        value={this.state.user.email}
		                        disabled={true}
		                    />
		                    <FormLine
		                        label={"Phone"}
		                        type={"phone"}
		                        value={this.state.user.phone}
		                        disabled={true}
		                    />
		                    <div className="right-buttons">
			                    <button
			                        onClick={() => this.save()}>
			                        <i class="far fa-save"/> Save
			                    </button>
			                </div>
	           			</div>
           			: 
           				<Loading
                        	height={300}
                        />
                    }
				</div>
			</div>
		);
	}
}