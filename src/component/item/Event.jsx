import React, { Component } from "react";
import "./Event.css";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";
import { dateToString } from "../../utils/date.jsx";

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
						src={getApiURL() + "public/get_public_image/" + this.props.info.image}
						alt="Card image cap"/>
					: <NoImage
						height={200}
					/>
				}
				<div className="card-date">
					{this.props.info.start_date !== null && this.props.info.end_date !== null
						? <div>
							{dateToString(this.props.info.start_date, "DD MMM YYYY")
								=== dateToString(this.props.info.end_date, "DD MMM YYYY")
								&& dateToString(this.props.info.start_date, "DD MMM YYYY")
							}

							{dateToString(this.props.info.start_date, "DD MMM YYYY")
								!== dateToString(this.props.info.end_date, "DD MMM YYYY")
								&& dateToString(this.props.info.start_date, "MMM")
								=== dateToString(this.props.info.end_date, "MMM")
								&& <div>
									{dateToString(this.props.info.start_date, "DD")}
									-
									{dateToString(this.props.info.end_date, "DD MMM YYYY")}
								</div>
							}

							{dateToString(this.props.info.start_date, "DD MMM YYYY")
								!== dateToString(this.props.info.end_date, "DD MMM YYYY")
								&& dateToString(this.props.info.start_date, "MMM")
								!== dateToString(this.props.info.end_date, "MMM")
								&& <div>
									{dateToString(this.props.info.start_date, "DD MMM YYYY")}
									<br/>
									{dateToString(this.props.info.end_date, "DD MMM YYYY")}
								</div>
							}
						</div>
						: "No info"
					}
				</div>
			</div>
			<div className="card-body">
				<h5 className="card-title">{this.props.info.title}</h5>

				<div className="card-text">
					<div dangerouslySetInnerHTML={{
						__html:
						dompurify.sanitize(this.props.info.abstract),
					}} />
				</div>

				<button
					className={"blue-background"}
				>
					Know more
				</button>
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
