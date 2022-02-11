import React from "react";
import "./PageWhatsinit.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import ShadowBoxMyCyberlux from "../box/ShadowBoxMyCyberlux.jsx";

export default class PageWhatsinit extends React.Component {
	constructor(props) {
		super(props);

		this.render = this.render.bind(this);

		this.state = {
		};
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageWhatsinit page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/whatsinit">WHAT&apos;S IN IT?</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Join the CYBERSECURITY Luxembourg ecosystem!</h1>

						<p>
							Are you a Luxembourg-based company with cybersecurity services?
						</p>

						<p>
							Join the CYBERSECURITY Luxembourg ecosystem! Benefit
							from business and visibility opportunities throughout
							the country, and abroad – and boost the national ecosystem!
						</p>
					</div>

					<div className="col-md-4 offset-md-4">
						<ShadowBoxMyCyberlux/>
					</div>
				</div>

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Endorse the CYBERSECURITY Luxembourg branding</h1>

						<p>
							The standard logo CYBERSECURITY Luxembourg may be used,
							in respect with the rules of the <a
								href="/pdf/Charte-CYBERSECURITY_2021.pdf"
								rel="noreferrer"
								target="_blank">
								logo guidelines
							</a>
							, by anyone to brand any publication,
							event, or any other activity in relation with cybersecurity
							and related to Luxembourg, either in Luxembourg or abroad.
						</p>

						<p>
							Only members of the ecosystem may create a derivate of
							the logo to brand their own event(s) or publication(s).
							In order to do so, they must
							contact <a href="mailto:info@cybersecurity-luxembourg.com">
								info@cybersecurity-luxembourg.com
							</a>.
						</p>

						<p>
							The Guidelines of CYBERSECURITY Luxembourg, the usage of the
							logo and all its derivates are managed by SECURITYMADEIN.LU and
							validated by the CYBERSECURITY Luxembourg Committee.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
