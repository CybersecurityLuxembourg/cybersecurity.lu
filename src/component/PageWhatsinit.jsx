import React from "react";
import "./PageWhatsinit.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageWhatsinit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageWhatsinit" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/whatsinit">WHAT&apos;S IN IT?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						CONTENT
					</div>
				</div>
			</div>
		);
	}
}
