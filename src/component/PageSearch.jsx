import React from "react";
import "./PageSearch.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import SearchField from "./form/SearchField.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";

export default class PageSearch extends React.Component {
	constructor(props) {
		super(props);

		this.getEntities = this.getEntities.bind(this);

		this.state = {
			searchValue: getUrlParameter("r"),
			entities: null,
		};
	}

	componentDidMount() {
		this.getEntities();
	}

	componentDidUpdate() {
		if (this.state.searchValue !== getUrlParameter("r")) {
			this.setState({ searchValue: getUrlParameter("r") }, () => {
				this.getEntities();
			});
		}
	}

	getEntities() {
		if (this.state.searchValue !== null && this.state.searchValue.length > 2) {
			const filters = {
				name: this.state.searchValue,
			};

			getRequest.call(this, "public/get_public_companies?"
				+ dictToURI(filters), (data) => {
				this.setState({
					entities: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				entities: null,
			});
		}
	}

	render() {
		return (
			<div className={"PageSearch page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/search">SEARCH</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<SearchField
					value={this.state.searchValue}
				/>

				{this.state.entities === null
					&& this.state.searchValue !== null && this.state.searchValue.length >= 3
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities === null
					&& this.state.searchValue !== null && this.state.searchValue.length < 3
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"The search query must contain at least 3 characters"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities === null
					&& this.state.searchValue === null
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"Please type your search query"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities !== null
					&& this.state.entities.length === 0
					&& <div className="row">
						<div className="col-md-12">
							<Message
								text={"No result found"}
								height={300}
							/>
						</div>
					</div>
				}

				{this.state.entities !== null && this.state.entities.length > 0
					&& <div className="row">
						<div className="col-md-12">
							<h1>{this.state.entities !== null ? this.state.entities.length + " " : ""}entit{this.state.entities !== null && this.state.entities.length > 1 ? "ies" : "y"}</h1>
						</div>
						<div className="col-md-12">
							<SimpleTable
								numberDisplayed={10}
								elements={this.state.entities.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-6">
										<Company
											info={a}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
