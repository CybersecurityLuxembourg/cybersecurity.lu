import React, { Component } from "react";
import "./Chip.css";

export default class Chip extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return <div className="Chip">
			<div
				className="Chip-head"
				style={{ backgroundColor: this.props.color !== undefined ? this.props.color : null }}>
				<i className="fas fa-hashtag"/>
			</div>

			<object
				className={"Chip-link-wrapper"}
				onClick={() => {
					if (this.props.url) {
						window.open(this.props.url, "_self");
					}
				}}>
				<div className="Chip-content">
					{this.props.label}
				</div>
			</object>

			{this.props.onClick !== undefined
				? <div className="Chip-close">
					<i
						className="fas fa-times"
						onClick={() => this.props.onClick(this.props.value)}
					/>
				</div>
				: ""}
		</div>;
	}
}
