import React from "react";
import "./PrivateSpaceRequest.css";
import { NotificationManager as nm } from "react-notifications";
import FormLine from "../form/FormLine.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import Info from "../box/Info.jsx";
import { getRequest, postRequest } from "../../utils/request.jsx";
import Request from "../item/Request.jsx";

export default class PrivateSpaceRequest extends React.Component {
	constructor(props) {
		super(props);

		this.refresh = this.refresh.bind(this);
		this.submitRequest = this.submitRequest.bind(this);

		this.state = {
			text: null,
			requests: null,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.setState({
			requests: null,
		});

		getRequest.call(this, "privatespace/get_my_requests", (data) => {
			this.setState({
				requests: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	submitRequest() {
		const params = {
			request: this.state.text,
		};

		postRequest.call(this, "privatespace/add_request", params, () => {
			this.refresh();
			this.setState({
				text: null,
			});
			nm.info("The request has been submitted");
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div className="PrivateSpaceRequest">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Your current requests</h2>
						<div className="top-right-buttons">
							<button
								onClick={this.refresh}>
								<i className="fas fa-redo-alt"/>
							</button>
						</div>
					</div>

					{this.state.requests !== null && this.state.requests.length === 0
						&& <div className="col-md-12">
							<Message
								text={"No request found"}
								height={150}
							/>
						</div>
					}
					{this.state.requests !== null && this.state.requests.length > 0
						&& this.state.requests.map((r) => (
							<div className="col-md-12" key={r.id}>
								<Request
									info={r}
									afterDelete={this.refresh}
								/>
							</div>
						))
					}
					{this.state.requests === null
						&& <div className="col-md-12">
							<Loading
								height={150}
							/>
						</div>
					}
				</div>
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Issue a new request</h2>
					</div>

					<div className="col-md-12">
						<Info
							content={
								<div>
									You can do any request regarding the CYBERSECURITY LUXEMBOURG project.<br/>
									One of the operator of the project will reply you back in the shortest delay.
								</div>
							}
						/>
						<FormLine
							label={"Message"}
							type={"textarea"}
							fullWidth={true}
							value={this.state.text}
							onChange={(v) => this.setState({ text: v })}
						/>
						<div className="right-buttons">
							<button
								onClick={this.submitRequest}
								disabled={this.state.text === null || this.state.text.length === 0}>
								<i className="fas fa-paper-plane"/> Submit request
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
