import React, { Component } from "react";
import "./Chip.css";

export default class Chip extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	getChipContent() {
		return <div className="Chip">
			<div
				className="Chip-head"
				style={{ backgroundColor: this.props.color !== undefined ? this.props.color : null }}>
				<i className="fas fa-hashtag"/>
			</div>
			<div className="Chip-content">
				{this.props.label}
			</div>
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

	render() {
		if (this.props.url === undefined) {
			return this.getChipContent();
		}
		return (
			<object
				className={"Chip-link-wrapper"}
				onClick={() => window.open(this.props.url, "_self")}>
				{this.getChipContent()}
			</object>
		);
	}
}
