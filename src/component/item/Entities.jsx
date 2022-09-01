import React, { Component } from "react";
import { NotificationManager as nm } from "react-notifications";
import "./Entities.css";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Entity from "./Entity.jsx";

export default class Entities extends Component {
	constructor(props) {
		super(props);

		this.state = {
			entities: null,
		};
	}

	componentDidMount() {
		getRequest.call(this, "public/get_public_entities?name=" + this.props.name, (data) => {
			this.setState({
				entities: data,
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
		if (!this.state.entities) {
			return <Loading
				height={150}
			/>;
		}

		return <div className={"Entities"}>
			{this.state.entities.map((c) => (
				<Entity
					info={c}
					key={c.id}
				/>
			))}
		</div>;
	}
}
