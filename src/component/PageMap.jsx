import React from "react";
import "./PageMap.css";
import GlobalMap from "./map/GlobalMap.jsx";

export default class PageMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div id="PageMap">
				<GlobalMap
					analytics={this.props.analytics}
				/>

				<div className={"PageMap-back-button"}>
					<button
						className={"blue-background"}
						onClick={this.props.history.goBack}
					>
						<i className="fas fa-arrow-circle-left"/> Go back
					</button>
				</div>
			</div>
		);
	}
}
