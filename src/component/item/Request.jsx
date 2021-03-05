import React, { Component } from 'react';
import './Request.css';
import {postRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';


export default class Request extends Component {

	constructor(props) {
		super(props);

		this.delete = this.delete.bind(this);

		this.state = {
		}
	}

	delete() {
		let params = {
			id: this.props.info.id
		}

		postRequest.call(this, "privatespace/delete_my_request", params, response => {
			if (this.props.afterDelete !== undefined)
				this.props.afterDelete()

			nm.info("The request has been deleted");
		}, response => {
			nm.warning(response.statusText);
		}, error => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div class="Request card">
				<div class="card-horizontal">
					<div class="card-body">
						<div class="card-date">{this.props.info.submission_date}</div>
						<div class="card-type">STATUS: {this.props.info.status}</div>
						<p className="card-text">
							<div dangerouslySetInnerHTML={
								{ __html: this.props.info.request.replaceAll("\n", "<br />","g") }
							}/>
						</p>
						<button
							className={"red-background"}
							onClick={this.delete}
							disabled={this.props.info.link === null}
						>
							<i className="fas fa-trash-alt"/> Delete the request
						</button>
					</div>
				</div>
			</div>
		);
	}
}