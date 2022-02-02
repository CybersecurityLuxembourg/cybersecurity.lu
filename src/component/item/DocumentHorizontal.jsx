import React, { Component } from "react";
import "./DocumentHorizontal.css";
import { getApiURL } from "../../utils/env.jsx";

export default class DocumentHozizontal extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return (
			<div className="DocumentHorizontal card">
				<div className="card-horizontal">
					<div className="card-body">
						<h5 className="card-title">
							<i className="fas fa-file"/> {this.props.info.filename}
						</h5>

						<button className={"blue-background"}>
							Open document
						</button>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return <a
			href={getApiURL() + "public/get_public_document/" + this.props.info.filename}
			target={"_blank"}
			rel="noreferrer"
			className="DocumentHorizontal-link">
			{this.getBoxContent()}
		</a>;
	}
}
