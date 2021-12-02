import React, { Component } from "react";
import { NotificationManager as nm } from "react-notifications";
import "./Companies.css";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Company from "./Company.jsx";

export default class Companies extends Component {
	constructor(props) {
		super(props);

		this.state = {
			companies: null,
		};
	}

	componentDidMount() {
		getRequest.call(this, "public/get_public_companies?name=" + this.props.name, (data) => {
			this.setState({
				companies: data,
			});
		}, (response) => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, (error) => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	render() {
		if (!this.state.companies) {
			return <Loading
				height={150}
			/>;
		}

		return <div className={"Companies"}>
			{this.state.companies.map((c) => (
				<Company
					info={c}
					key={c.id}
				/>
			))}
		</div>;
	}
}
