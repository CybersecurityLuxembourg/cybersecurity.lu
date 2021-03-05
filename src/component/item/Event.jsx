import React, { Component } from 'react';
import './Event.css';
import NoImage from "../box/NoImage";
import { Link } from "react-router-dom";
import { getApiURL } from "../../utils/env";


export default class Event extends Component {

	constructor(props) {
		super(props);

		this.state = {
		}
	}

	render() {
		return (
			<Link to={"/calendar/" + this.props.info.handle} className="Event-link">
				<div className="Event card">
					<div className="card-img-wrapper">
						{this.props.info.image !== null && this.props.info.image !== undefined ?
							<img 
								className="card-img-top" 
								src={getApiURL() + "public/get_image/" + this.props.info.image} 
								alt="Card image cap"/> 
						:
							<NoImage
								height={200}
							/>
						}
						<div class="card-date">
							{this.props.info.start_date !== null && this.props.info.end_date !== null ?
								this.props.info.start_date.substring(0, 10) 
								+ " "
								+ this.props.info.start_date.substring(11, 16)
								+ " - " 
								+ this.props.info.end_date.substring(0, 10) 
								+ " "
								+ this.props.info.end_date.substring(11, 16)
							:
								"No info"
							}
						</div>
						<div class="card-type">{this.props.info.type}</div>
					</div>
					<div className="card-body">
						<h5 className="card-title">{this.props.info.title}</h5>
						<p className="card-text">{this.props.info.abstract}</p>
						<button
							className={"blue-background"}
						>
							<i class="fas fa-arrow-alt-circle-right"/> More info
						</button>
					</div>
				</div>
			</Link>
		);
	}
}