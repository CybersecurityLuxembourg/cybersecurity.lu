import React, { Component } from "react";
import "./Company.css";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Company extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<Link to={"/company/" + this.props.info.id} className="Company-link">
				<div className="Company card">
					<div className="card-horizontal">
						<div className="img-square-wrapper">
							{this.props.info.image !== null && this.props.info.image !== undefined
								? <img
									className="card-img-top"
									src={getApiURL() + "public/get_image/" + this.props.info.image}
									alt="Card image cap"/>

								:								<NoImage/>
							}
						</div>
						<div className="card-body">
							<h5 className="card-title">{this.props.info.name}</h5>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}
