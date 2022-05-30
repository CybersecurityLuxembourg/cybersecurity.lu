import React from "react";
import "./ShadowBox.css";
import { Link } from "react-router-dom";

export default class ShadowBox extends React.Component {
	getColor() {
		if (this.props.color) {
			return this.props.color;
		}

		return "blue";
	}

	getBoxContent() {
		return <div className="ShadowBox-content">
			{this.props.title
				&& <h3>{this.props.title}</h3>}

			{this.props.icon
				&& <i className={this.props.icon}/>}

			{this.props.abstract
				&& <div>{this.props.abstract}</div>}
		</div>;
	}

	render() {
		return (
			<div className={"ShadowBox shadow-section "
				+ this.getColor() + "-shadow-section centered-shadow-section "
				+ (this.props.className || "")}>
				{this.props.link
					&& (!this.props.link.startsWith("http")
						? <Link to={this.props.link}>
							{this.getBoxContent()}
						</Link>
						: <a href={this.props.link}>
							{this.getBoxContent()}
						</a>
					)
				}

				{this.props.onClick
					&& <a onClick={() => this.props.onClick()}>
						{this.getBoxContent()}
					</a>
				}

				{!this.props.onClick && !this.props.link
					&& <a>
						{this.getBoxContent()}
					</a>
				}
			</div>
		);
	}
}
