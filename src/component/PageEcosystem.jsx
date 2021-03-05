import React from "react";
import "./PageEcosystem.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { NotificationManager as nm } from "react-notifications";
import CountUp from "react-countup";
import Lock from "./box/Lock.jsx";
import Analytic from "./box/Analytic.jsx";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Company from "./item/Company.jsx";
import SimpleTable from "./table/SimpleTable.jsx";
import CompanySearch from "./form/CompanySearch.jsx";
import GlobalMap from "./map/GlobalMap.jsx";
import BarWorkforceRange from "./chart/BarWorkforceRange.jsx";
import BarActorAge from "./chart/BarActorAge.jsx";
import { getUrlParameter, dictToURI } from "../utils/url.jsx";
import VennActorDistribution from "./chart/VennActorDistribution.jsx";

export default class PageEcosystem extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanies = this.getCompanies.bind(this);
		this.getAnalytics = this.getAnalytics.bind(this);
		this.getTotalEmployees = this.getTotalEmployees.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			actors: null,
			publicEntities: null,
			privateEntities: null,
			civilSociety: null,
			jobPlatforms: null,
			analytics: null,
			geolocations: null,
			filters: {
				name: getUrlParameter("name"),
				taxonomy_values: getUrlParameter("taxonomy_values") !== null
					? getUrlParameter("taxonomy_values").split(",").map((v) => parseInt(v)) : [],
				startup_only: getUrlParameter("startup_only") === "true",
				corebusiness_only: getUrlParameter("corebusiness_only") === "true",
			},
		};
	}

	componentDidMount() {
		this.getCompanies();
		this.getAnalytics();
	}

	getCompanies() {
		getRequest.call(this, "public/get_public_companies?" + dictToURI(this.state.filters), (data) => {
			this.setState({
				actors: data.filter((c) => c.type === "ACTOR"),
				publicEntities: data.filter((c) => c.type === "PUBLIC SECTOR"),
				privateEntities: data.filter((c) => c.type === "PRIVATE SECTOR"),
				civilSociety: data.filter((c) => c.type === "CIVIL SOCIETY"),
				jobPlatforms: data.filter((c) => c.type === "JOB PLATFORM"),
			}, () => {
				getRequest.call(this, "public/get_public_company_geolocations?" + dictToURI(this.state.filters), (data) => {
					this.setState({
						geolocations: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getAnalytics() {
		getRequest.call(this, "public/get_public_analytics", (data) => {
			this.setState({
				analytics: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	onSearch() {
		history.replaceState(null, null, "?" + dictToURI(this.state.filters));

		this.getCompanies();
		this.getAnalytics();
	}

	modifyFilters(field, value) {
		const filters = { ...this.state.filters };
		filters[field] = value;
		this.setState({ filters });
	}

	getTotalEmployees() {
		if (this.state.actors === null) return 0;

		let total = 0;
		const acceptedIDs = this.state.actors.map((a) => a.id);

		for (const i in this.state.analytics.workforces) {
			if (acceptedIDs.indexOf(this.state.analytics.workforces[i].company) >= 0) {
				total += this.state.analytics.workforces[i].workforce;
			}
		}

		return total;
	}

	render() {
		return (
			<div className={"PageEcosystem page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/competence">ECOSYSTEM</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<CompanySearch
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.onSearch}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>{this.state.actors !== null ? this.state.actors.length + " " : ""}actors</h1>
					</div>
				</div>

				{this.state.actors !== null
					? <SimpleTable
						numberDisplayed={6}
						elements={this.state.actors.map((a, i) => [a, i])}
						buildElement={(a, i) => (
							<div className="col-md-6">
								<Company
									info={a}
								/>
							</div>
						)}
					/>
					:					<div className="row">
						<div className="col-md-12">
							<Loading
								height={400}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Dashboard</h1>
					</div>
					<div className="col-md-12 row-spaced">
						{this.state.actors !== null
							? <VennActorDistribution
								actors={this.state.actors !== null ? this.state.actors : []}
							/>
							:							<Loading
								height={400}
							/>
						}
					</div>
					<div className="col-md-6">
						<h3>Total employees</h3>
						<div>
							{this.state.actors !== null && this.state.analytics !== null
								? <Analytic
									value={this.getTotalEmployees()}
									desc={"Total employees"}
								/>
								:								<Loading
									height={300}
								/>
							}
						</div>
					</div>
					<div className="col-md-6">
						<h3>Employees per company size ranges</h3>
						{this.state.actors !== null && this.state.analytics !== null
							? <BarWorkforceRange
								actors={this.state.actors}
								workforces={this.state.analytics.workforces}
								addRangeFilter={(v) => this.manageFilter("size_range", v, "true")}
								selected={this.state.filters.size_range}
							/>
							:							<Loading
								height={300}
							/>
						}
					</div>
					<div className="col-md-6">
						<h3>Age of companies</h3>
						{this.state.actors !== null && this.state.analytics !== null
							? <BarActorAge
								actors={this.state.actors}
								addRangeFilter={(v) => this.manageFilter("age_range", v, "true")}
								selected={this.state.filters.age_range}
							/>
							:							<Loading
								height={300}
							/>
						}
					</div>
					<div className="col-md-6">
						<h3>Companies per size ranges</h3>
						{this.state.actors !== null && this.state.analytics !== null
							? <BarWorkforceRange
								actors={this.state.actors}
								workforces={this.state.analytics.workforces}
								companiesAsGranularity={true}
								addRangeFilter={(v) => this.manageFilter("size_range", v, "true")}
								selected={this.state.filters.size_range}
							/>
							:							<Loading
								height={300}
							/>
						}
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Public sector</h1>
					</div>
				</div>

				{this.state.publicEntities !== null
					? <SimpleTable
						numberDisplayed={6}
						elements={this.state.publicEntities.map((a, i) => [a, i])}
						buildElement={(a, i) => (
							<div className="col-md-6">
								<Company
									info={a}
								/>
							</div>
						)}
					/>
					:					<div className="row">
						<div className="col-md-12">
							<Loading
								height={400}
							/>
						</div>
					</div>
				}

				<div className="row row-spaced">
					<div className="col-md-12">
						<h1>Map</h1>
					</div>
					<div className="col-md-12">
						{this.state.actors !== null
							? <GlobalMap
								addresses={this.state.geolocations}
								companies={this.state.actors.concat(
									this.state.publicEntities,
									this.state.privateEntities,
									this.state.civilSociety,
									this.state.jobPlatforms,
								)}
							/>
							:							<Loading
								height={400}
							/>
						}
					</div>
					<div className="col-md-12">
						{this.state.actors !== null
							? <div className={"right-buttons"}>
								<button
									className={"blue-background"}
									onClick={() => this.props.history.push("/map")}
								>
									<i className="fas fa-arrow-alt-circle-right"/> View the map on full page
								</button>
							</div>
							:							""
						}
					</div>
				</div>
			</div>
		);
	}
}
