import React from "react";
import "./PageCivilSociety.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Message from "./box/Message.jsx";
import Company from "./item/Company.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import CivilSocietySearch from "./form/CivilSocietySearch.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import ButtonRegister from "./form/ButtonRegister.jsx";

export default class PageCivilSociety extends React.Component {
	constructor(props) {
		super(props);

		this.getCivilSociety = this.getCivilSociety.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			civilSociety: null,
			filters: {
				name: getUrlParameter("name"),
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v, 10)) : [],
			},
		};
	}

	componentDidMount() {
		this.getCivilSociety();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getLTACPodcasts();
			this.getBreakfastPodcasts();
		}
	}

	getCivilSociety() {
		if (this.props.analytics
			&& this.props.analytics.taxonomy_values) {
			const values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE")
				.filter((v) => v.name === "CIVIL SOCIETY");

			if (values.length > 0) {
				this.setState({
					civilSociety: null,
				}, () => {
					const params = {
						taxonomy_values: values.map((v) => v.id).join(","),
						...this.state.filters,
					};

					getRequest.call(this, "public/get_public_companies?" + dictToURI(params), (data) => {
						this.setState({
							civilSociety: data
								.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)),
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			} else {
				this.setState({
					civilSociety: { pagination: { total: 0 } },
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
			<div className={"PageCivilSociety page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/civilsociety">CIVIL SOCIETY</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12 right-buttons">
						<ButtonRegister/>
					</div>
				</div>

				<CivilSocietySearch
					taxonomy={this.props.taxonomy}
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.onSearch}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Civil society</h1>
					</div>
				</div>

				{this.state.civilSociety !== null && this.state.civilSociety.length > 0
					&& <SimpleTable
						numberDisplayed={10}
						elements={this.state.civilSociety.map((a, i) => [a, i])}
						buildElement={(a) => (
							<div className="col-md-6">
								<Company
									info={a}
								/>
							</div>
						)}
					/>
				}

				{this.state.civilSociety !== null && this.state.civilSociety.length === 0
					&& <Message
						text={"No entity found"}
						height={300}
					/>
				}

				{this.state.civilSociety === null
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
