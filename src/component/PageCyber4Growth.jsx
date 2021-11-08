import React from "react";
import "./PageCyber4Growth.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Loading from "./box/Loading.jsx";
import { getRequest } from "../utils/request.jsx";
import { dictToURI } from "../utils/url.jsx";
import Company from "./item/Company.jsx";
import Message from "./box/Message.jsx";
import SimpleTable from "./table/SimpleTable.jsx";

export default class PageCyber4Growth extends React.Component {
	constructor(props) {
		super(props);

		this.getVCs = this.getVCs.bind(this);

		this.state = {
			vcEntities: null,
			mediaEntities: null,
		};
	}

	componentDidMount() {
		this.getVCs();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics && !this.state.vcEntities) {
			this.getVCs();
		}

		if (!prevProps.analytics && this.props.analytics && !this.state.mediaEntities) {
			this.getMedia();
		}
	}

	getVCs() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "VENTURE CAPITAL");

			if (values.length > 0) {
				this.setState({
					vcEntities: null,
				});

				const params = dictToURI({
					taxonomy_values: values[0].id,
				});

				getRequest.call(this, "public/get_public_companies?" + params, (data) => {
					this.setState({
						vcEntities: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	getMedia() {
		if (this.props.analytics && this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "MEDIA");

			if (values.length > 0) {
				this.setState({
					mediaEntities: null,
				});

				const params = dictToURI({
					taxonomy_values: values[0].id,
				});

				getRequest.call(this, "public/get_public_companies?" + params, (data) => {
					this.setState({
						mediaEntities: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageCyber4Growth"} className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/cyber4growth">Cyber4Growth</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-2 order-1 order-md-2">
						Box
					</div>

					<div className="col-md-10 order-2 order-md-1">
						<div className="row">
							<div className="col-md-12">
								<h2>Venture capital</h2>
							</div>

							{this.state.vcEntities && this.state.vcEntities.length === 0
								&& <div className="col-md-12">
									<Message
										text={"No VC found"}
										height={200}
									/>
								</div>
							}

							{this.state.vcEntities && this.state.vcEntities.length > 0
								&& <div className="col-md-12">
									<SimpleTable
										elements={this.state.vcEntities.map((a, i) => [a, i])}
										numberDisplayed={6}
										buildElement={(a) => <div className="col-md-6">
											<Company
												info={a}
											/>
										</div>}
									/>
								</div>
							}

							{!this.state.vcEntities
								&& <div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							}
						</div>

						<div className="row row-spaced">
							<div className="col-md-12">
								<h2>Media</h2>
							</div>

							{this.state.mediaEntities && this.state.mediaEntities.length === 0
								&& <div className="col-md-12">
									<Message
										text={"No media found"}
										height={200}
									/>
								</div>
							}

							{this.state.mediaEntities && this.state.mediaEntities.length > 0
								&& <div className="col-md-12">
									<SimpleTable
										elements={this.state.mediaEntities.map((a, i) => [a, i])}
										numberDisplayed={6}
										buildElement={(a) => <div className="col-md-6">
											<Company
												info={a}
											/>
										</div>}
									/>
								</div>
							}

							{!this.state.mediaEntities
								&& <div className="col-md-12">
									<Loading
										height={200}
									/>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
