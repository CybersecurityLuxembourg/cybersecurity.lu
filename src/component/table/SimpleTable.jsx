import React, { Component } from "react";
import "./SimpleTable.css";

class SimpleTable extends Component {
	constructor(props) {
		super(props);

		this.setPreviousPage = this.setPreviousPage.bind(this);
		this.setNextPage = this.setNextPage.bind(this);

		this.state = {
			id: "simpleTable-" + Date.now(),
			page: 1,
			numberDisplayed: props.numberDisplayed !== undefined ? props.numberDisplayed : 9,
		};
	}

	setPreviousPage() {
		if (this.state.page > 1) {
			this.setState({ page: this.state.page - 1 });
		}
	}

	setNextPage() {
		if (Math.min(
			this.state.page * this.state.numberDisplayed,
			this.props.elements.length,
		) < this.props.elements.length) {
			this.setState({ page: this.state.page + 1 });
		}
	}

	render() {
		const minDisplayed = Math.min(
			this.state.page * this.state.numberDisplayed - (this.state.numberDisplayed - 1),
			this.props.elements.length,
		);
		const maxDisplayed = Math.min(
			this.state.page * this.state.numberDisplayed,
			this.props.elements.length,
		);

		return (
			<div id={this.state.id} className={"row row-spaced simpleTable "
			+ (this.props.className ? this.props.className : "")}>
				{this.props.elements.slice().splice(minDisplayed - 1, this.state.numberDisplayed)
					.map((o) => this.props.buildElement(...o))
				}
				<div className={"col-md-12"}>
					<div className="simpleTable-info">
						{minDisplayed}-{maxDisplayed} on {this.props.elements.length}
					</div>
					<div className={"simpleTable-arrowLeft"}>
						<i className={"fas fa-arrow-left hoverEffect elementIcon "
							+ (minDisplayed <= 1 ? "iconDisabled" : "")}
						onClick={this.setPreviousPage}/>
					</div>
					<div className={"simpleTable-arrowRight"}>
						<i className={"fas fa-arrow-right hoverEffect elementIcon "
							+ (maxDisplayed === this.props.elements.length
								? "iconDisabled" : "")}
						onClick={this.setNextPage}/>
					</div>
				</div>
			</div>
		);
	}
}

export default SimpleTable;
