import React from "react";
import "./CyberWeekReplays.css";
import Message from "../box/Message.jsx";

export default class CyberWeekReplays extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekReplays"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Replays</h2>
					</div>

					<div className="offset-md-3"/>

					<div className="col-md-6">
						<Message
							text={"Content incoming soon"}
							height={250}
						/>
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
