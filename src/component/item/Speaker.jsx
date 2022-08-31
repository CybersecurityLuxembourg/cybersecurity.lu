import React, { Component } from "react";
import "./Speaker.css";
import NoImage from "../box/NoImage.jsx";
import { getApiURL } from "../../utils/env.jsx";

export default class Speaker extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getContent() {
		return <div className="Speaker card">
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
					<div>
						<b>{this.props.info.name}</b>
					</div>
					<div className="card-body-headline">
						{this.props.info.headline}
					</div>
					<div className="card-body-company">
						{this.props.entities
							&& this.props.entities.map((e, i) => (
								<span key={e.id}><i>{e.name}</i>{i + 1 < this.props.entities.length && ", "}</span>
							))
						}
					</div>
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
				className="Speaker-link">
				{this.getContent()}
			</a>
		);
	}
}
