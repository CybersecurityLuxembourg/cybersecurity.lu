import React, { Component } from "react";
import "./Article.css";
import { Link } from "react-router-dom";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getBoxContent() {
		return <div className="Article card">
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
				<div className="card-date">{this.props.info.publication_date}</div>
				<div className="card-type">{this.props.info.type}</div>
			</div>
			<div className="card-body">
				<h5 className="card-title">{this.props.info.title}</h5>
				<p className="card-text">{this.props.info.abstract}</p>
				{this.props.info.link !== null
					&& this.props.info.link !== undefined
					? <button
						className={"blue-background"}
					>
						<i className="fas fa-arrow-alt-circle-right"/> Open website
					</button>
					: <button
						className={"blue-background"}
					>
						<i className="fas fa-arrow-alt-circle-right"/> Read article
					</button>}
			</div>
		</div>;
	}

	render() {
		return this.props.info.link !== null
			&& this.props.info.link !== undefined
			? <a
				href={this.props.info.link}
				target={"_blank"}
				rel="noreferrer"
				className="Article-link">
				{this.getBoxContent()}
			</a>
			: <Link to={"/news/" + this.props.info.handle} className="Article-link">
				{this.getBoxContent()}
			</Link>;
	}
}
