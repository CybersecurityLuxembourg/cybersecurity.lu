import React from "react";
import "./PageLHC.css";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class PageLHC extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id="PageLHC" className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/lhc">LUXEMBOURG HOUSE OF CYBERSECURITY</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="offset-md-3 col-md-6">
						<img
							src={"img/logo_lhc.png"}
							alt={"LOGO LHC"}
						/>
					</div>

					<div className="col-md-10 offset-md-1 centered row-spaced">
						<h3><i>Make Luxembourg a pioneer in the open cybersecurity data economy</i></h3>
					</div>

					<div className="col-md-10 offset-md-1">
						<h3>We support, we foster, we serve the Luxembourg ecosystem & more</h3>
					</div>

					<div className="offset-md-3 col-md-6 row-spaced">
						<img
							src={"img/lhc_audience.png"}
							alt={"LHC AUDIENCE"}
						/>
					</div>

					<div className="col-md-4 offset-md-1 row-spaced">
						<h3>Our mission</h3>

						<br/><br/>

						<p>
							We are the backbone for leading-edge cyber resilience in Luxembourg. We
							aim at capitalizing on and further developing innovation, competencies,
							collaboration and capacity building.
						</p>
					</div>

					<div className="col-md-4 offset-md-2 row-spaced PageLHC-center-p">
						<h3>Contact</h3>

						<br/>

						<p>
							<b>Luxembourg House of Cybersecurity</b><br/>
							122 rue Adolphe Fischer<br/>
							L-1521 Luxembourg<br/><br/>
							info@lhc.lu<br/>
							+352 274 00 98 601
						</p>
					</div>
				</div>
			</div>
		);
	}
}
