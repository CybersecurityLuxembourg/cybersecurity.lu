import React, { Component } from "react";
import "./JobOffer.css";
import { Link } from "react-router-dom";

export default class JobOffer extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<Link to={"/jobs/" + this.props.info.id} className="JobOffer-link">
				<div className="JobOffer card">
					<div className="card-horizontal">
						<div className="card-body">
							<div className="card-date">{this.props.info.publication_date}</div>
							<div className="card-type">{this.props.info.type}</div>
							<h5 className="card-title">{this.props.info.title}</h5>
							<p className="card-text"></p>
							<button
								className={"blue-background"}
							>
								<i className="fas fa-arrow-alt-circle-right"/> More info
							</button>
							<button
								className={"blue-background"}
								onClick={() => window.open(this.props.info.link, "_blank")}
								disabled={this.props.info.link === null}
							>
								<i className="fas fa-arrow-alt-circle-right"/> View original webpage
							</button>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}
