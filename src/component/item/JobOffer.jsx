import React, { Component } from 'react';
import './JobOffer.css';
import NoImage from "../box/NoImage";
import { Link } from "react-router-dom";
import { getApiURL } from "../../utils/env";


export default class JobOffer extends Component {

	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<Link to={"/jobs/" + this.props.info.id} className="JobOffer-link">
				<div class="JobOffer card">
					<div class="card-horizontal">
						<div class="card-body">
							<div class="card-date">{this.props.info.publication_date}</div>
							<div class="card-type">{this.props.info.type}</div>
							<h5 class="card-title">{this.props.info.title}</h5>
							<p className="card-text">Luxembourg <i>- Published by MooviJob</i></p>
							<button
								className={"blue-background"}
							>
								<i class="fas fa-arrow-alt-circle-right"/> More info
							</button>
							<button
								className={"blue-background"}
								onClick={() => window.open(this.props.info.link, "_blank")}
								disabled={this.props.info.link === null}
							>
								<i class="fas fa-arrow-alt-circle-right"/> View original webpage
							</button>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}