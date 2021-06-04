import React, { Component } from "react";
import "./Event.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Event extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return <div className="Event card">
			<div className="card-img-wrapper">
				{this.props.info.image !== null && this.props.info.image !== undefined
					? <img
						className="card-img-top"
						src={getApiURL() + "public/get_image/" + this.props.info.image}
						alt="Card image cap"/>
					: <NoImage
						height={200}
					/>
				}
				<div className="card-date">
					{this.props.info.start_date !== null && this.props.info.end_date !== null
						? <div>
							{this.props.info.start_date.substring(0, 10) + " "}
							{this.props.info.start_date.substring(11, 16)}
							<br/>
							{this.props.info.end_date.substring(0, 10) + " "}
							{this.props.info.end_date.substring(11, 16)}
						</div>
						:								"No info"
					}
				</div>
				{/* <div className="card-type">{this.props.info.type}</div> */}
			</div>
			<div className="card-body">
				<h5 className="card-title">{this.props.info.title}</h5>

				<p className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</p>

				{this.props.info.link !== null
					&& this.props.info.link !== undefined
					&& this.props.info.link.length > 0
					? <button
						className={"blue-background"}
					>
						Open website
					</button>
					: <button
						className={"blue-background"}
					>
						Know more
					</button>
				}
			</div>
		</div>;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			&& this.props.info.link.length > 0
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="Event-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/calendar/" + this.props.info.handle} className="Article-link">
				{this.getBoxContent()}
			</Link>;
	}
}
