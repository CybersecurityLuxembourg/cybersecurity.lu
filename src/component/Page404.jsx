import React from "react";
import "./Page404.css";
import { Link } from "react-router-dom";

export default class Page404 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="Page404" className={"page max-sized-page"}>
				<div>
					<i className="far fa-frown"/>
				</div>

				<div>
					This link is broken
				</div>

				<div>
					<Link to="/">Back to the home page</Link>
				</div>
			</div>
		);
	}
}
