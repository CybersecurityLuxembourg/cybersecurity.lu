import React, { Component } from "react";
import "./Entity.css";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Entity extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getContent() {
		return <div className="Entity card">
			<div className="card-horizontal">
				<div className="img-square-wrapper">
					{this.props.info.image !== null && this.props.info.image !== undefined
						? <img
							className="card-img-top"
							src={getApiURL() + "public/get_public_image/" + this.props.info.image}
							alt="Card image cap"/>

						: <NoImage/>
					}
				</div>
				<div className="card-body">
					<h5 className="card-title">{this.props.info.name}</h5>
				</div>
			</div>
		</div>;
	}

	render() {
		if (this.props.disableLink) {
			return this.getContent();
		}

		return (
			<a
				href={"/entity/" + this.props.info.id}
				className="Entity-link">
				{this.getContent()}
			</a>
		);
	}
}
