import React from 'react';
import './PrivateSpaceRequest.css';
import FormLine from '../form/FormLine';
import Loading from "../box/Loading";
import Info from "../box/Info";
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Company from "../item/Company";


export default class PrivateSpaceRequest extends React.Component {

	constructor(props){
		super(props);

		this.submitRequest = this.submitRequest.bind(this);

		this.state = {
			text: null,
		}
	}

	componentDidMount() {
	}

	refresh() {
	}

	submitRequest() {
		let params = {
            request: this.state.text
        }

        postRequest.call(this, "privatespace/add_request", params, response => {
        	this.setState({
        		text: null,
        	})
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	render() {
		return (
			<div className="PrivateSpaceRequest">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Request</h2>
					</div>

					<div className="col-md-12">
						<Info
                            content={
                            	<div>
                            		You can do any request regarding the CYBERSECURITY LUXEMBOURG project<br/>
                            		One of the operator of the project will reply you back in the shortest delay
                            	</div>
                        	}
                        />
	                    <FormLine
	                        label={"Message"}
	                        type={"textarea"}
	                        fullWidth={true}
	                        value={this.state.text}
	                        onChange={v => this.setState({ "text": v })}
	                    />
	                    <div className="right-buttons">
		                    <button
		                        onClick={this.submitRequest}
		                        disabled={this.state.text === null || this.state.text.length === 0}>
		                        <i class="fas fa-paper-plane"/> Submit request
		                    </button>
		                </div>
           			</div>
				</div>
			</div>
		);
	}
}