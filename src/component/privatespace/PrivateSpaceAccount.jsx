import React from "react";
import "./PrivateSpaceAccount.css";
import { NotificationManager as nm } from "react-notifications";
import _ from "lodash";
import FormLine from "../form/FormLine.jsx";
import Loading from "../box/Loading.jsx";
import { getRequest, postRequest } from "../../utils/request.jsx";

export default class PrivateSpaceAccount extends React.Component {
	constructor(props) {
		super(props);

		this.refresh = this.refresh.bind(this);
		this.save = this.save.bind(this);
		this.changeUser = this.changeUser.bind(this);

		this.state = {
			user: null,
			hasModification: false,
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.setState({
			user: null,
		});

		getRequest.call(this, "privatespace/get_my_user", (data) => {
			this.setState({
				user: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	save() {
		const params = {
			telephone: this.state.user.telephone,
			first_name: this.state.user.first_name,
			last_name: this.state.user.last_name,
		};

		postRequest.call(this, "privatespace/update_my_user", params, () => {
			this.setState({
				hasModification: false,
			});
			nm.info("The information has been saved");
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeUser(field, value) {
		const user = _.cloneDeep(this.state.user);
		user[field] = value;
		this.setState({
			user,
			hasModification: true,
		});
	}

	render() {
		return (
			<div className="PrivateSpaceAccount">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>My account</h2>
					</div>

					{this.state.user !== null
						? <div className="col-md-12">
							<FormLine
								label={"Email"}
								value={this.state.user.email}
								disabled={true}
							/>
							<FormLine
								label={"First name"}
								value={this.state.user.first_name}
								onChange={(v) => this.changeUser("first_name", v)}
							/>
							<FormLine
								label={"Last name"}
								value={this.state.user.last_name}
								onChange={(v) => this.changeUser("last_name", v)}
							/>
							<FormLine
								label={"Phone"}
								type={"phone"}
								value={this.state.user.telephone}
								onChange={(v) => this.changeUser("telephone", v)}
							/>
							<div className="right-buttons">
								<button
									onClick={() => this.save()}
									disabled={!this.state.hasModification}>
									<i className="far fa-save"/> Save
								</button>
							</div>
						</div>
						: 						<Loading
							height={300}
						/>
					}
				</div>
			</div>
		);
	}
}
