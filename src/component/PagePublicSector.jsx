import React from "react";
import "./PagePublicSector.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import PublicSectorSearch from "./form/PublicSectorSearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";

export default class PagePublicSector extends React.Component {
	constructor(props) {
		super(props);

		this.getPublicCompany = this.getPublicCompany.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			actors: null,
			publicEntities: null,
			analytics: null,
			filters: {
				name: getUrlParameter("name"),
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v, 10)) : [],
			},
		};
	}

	componentDidMount() {
		this.getPublicCompany();
	}

	componentDidUpdate(prevProps) {
		if (this.props.analytics !== prevProps.analytics) {
			this.getPublicCompany();
		}
	}

	getPublicCompany() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const entityTypes = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "PUBLIC SECTOR")
				.map((v) => v.id);

			if (entityTypes.length > 0) {
				this.setState({
					publicEntities: null,
				}, () => {
					const params = {
						...this.state.filters,
						taxonomy_values: entityTypes
							.concat(this.state.filters.taxonomy_values),
					};

					getRequest.call(this, "public/get_public_companies?" + dictToURI(params), (data) => {
						this.setState({
							publicEntities: data
								.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			}
		}
	}

	onSearch() {
		// eslint-disable-next-line no-restricted-globals
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getPublicCompany();
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"PagePublicSector page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/publicsector">PUBLIC SECTOR</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<PublicSectorSearch
					analytics={this.props.analytics}
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.onSearch}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Public sector</h1>
					</div>
				</div>

				{this.state.publicEntities !== null && this.state.publicEntities.length > 0
					&& <SimpleTable
						numberDisplayed={10}
						elements={this.state.publicEntities.map((a, i) => [a, i])}
						buildElement={(a) => (
							<div className="col-md-6">
								<Company
									info={a}
								/>
							</div>
						)}
					/>
				}

				{this.state.publicEntities !== null && this.state.publicEntities.length === 0
					&& <Message
						text={"No entity found"}
						height={300}
					/>
				}

				{this.state.publicEntities === null
					&& <div className="row">
						<div className="col-md-12">
							<Loading
								height={400}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}
