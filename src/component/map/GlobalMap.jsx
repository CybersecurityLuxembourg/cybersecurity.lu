import React from "react";
import "./GlobalMap.css";
import {
	MapContainer, TileLayer, Marker, Popup,
} from "react-leaflet";
import _ from "lodash";
import { NotificationManager as nm } from "react-notifications";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class GlobalMap extends React.Component {
	constructor(props) {
		super(props);

		this.getTaxonomyValues = this.getTaxonomyValues.bind(this);
		this.getCompanies = this.getCompanies.bind(this);
		this.changeFilter = this.changeFilter.bind(this);

		this.state = {
			lat: 49.8116,
			lng: 6.1319,
			zoom: 9,
			selectedCompanyId: null,
			companies: null,
			companyGeolocations: null,
			filters: {
				ecosystem_role: {},
				entity_type: {},
			},
		};
	}

	componentDidMount() {
		this.getTaxonomyValues();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.filters !== prevState.filters) {
			this.getCompanies();
		}
	}

	getTaxonomyValues() {
		getRequest.call(this, "public/get_public_taxonomy_values", (data) => {
			const filters = _.cloneDeep(this.state.filters);

			data.filter((v) => v.category === "ECOSYSTEM ROLE").forEach((v) => {
				filters.ecosystem_role[v.name] = true;
			});

			data.filter((v) => v.category === "ENTITY TYPE").forEach((v) => {
				filters.entity_type[v.name] = true;
			});

			this.setState({ filters });
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getCompanies() {
		const filters = {
			ecosystem_role: Object.keys(this.state.filters.ecosystem_role)
				.filter((r) => this.state.filters.ecosystem_role[r]),
			entity_type: Object.keys(this.state.filters.entity_type)
				.filter((r) => this.state.filters.entity_type[r]),
		};

		if (Object.keys(this.state.filters.ecosystem_role).length === filters.ecosystem_role.length) {
			delete filters.ecosystem_role;
		}

		if (Object.keys(this.state.filters.entity_type).length === filters.entity_type.length) {
			delete filters.entity_type;
		}

		getRequest.call(this, "public/get_public_companies?" + dictToURI(filters), (data) => {
			this.setState({
				companies: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});

		getRequest.call(this, "public/get_public_company_geolocations?" + dictToURI(filters), (data) => {
			this.setState({
				companyGeolocations: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	handlePopupOpen(companyId) {
		this.setState({ selectedCompanyId: companyId });
	}

	changeFilter(category, value, v) {
		const filters = _.cloneDeep(this.state.filters);
		filters[category][value] = v;
		this.setState({ filters });
	}

	render() {
		return (
			<div className={"GlobalMap " + (this.props.fullpage ? "GlobalMap-fullpage" : "")}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: "100%", height: "100%" }}
				>

					{Array.isArray(this.state.companyGeolocations)
						? this.state.companyGeolocations
							.filter((a) => a.latitude !== null && a.longitude !== null)
							.map((a) => (
								<div key={a.company_id}>
									<Marker
										position={[a.latitude, a.longitude]}
										eventHandlers={{ click: () => { this.handlePopupOpen(a.company_id); } }}>
										<Popup
											companyId={a.company_id}
										>
											{this.state.companies !== null && this.state.companies
												.filter((c) => c.id === this.state.selectedCompanyId).length > 0
												? this.state.companies
													.filter((c) => c.id === this.state.selectedCompanyId)[0].name
												: "Unfound company"}
											<br/><a href={"/company/" + a.company_id}>More info</a>
										</Popup>
									</Marker>
								</div>
							))
						: ""}

					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>

				<div className="GlobalMap-filters-top-right">
					{this.state.filters !== undefined && this.state.filters.ecosystem_role !== undefined
						&& <div>
							{Object.keys(this.state.filters.ecosystem_role).map((r) => (
								<div
									key={r}
									title="Show/Hide actors">
									<CheckBox
										label={r}
										value={this.state.filters.ecosystem_role[r]}
										onClick={(v) => this.changeFilter("ecosystem_role", r, v)}
									/>
								</div>
							))}
						</div>
					}
				</div>

				<div className="GlobalMap-filters-bottom-right">
					{this.state.filters !== undefined && this.state.filters.entity_type !== undefined
						&& <div>
							{Object.keys(this.state.filters.entity_type).map((r) => (
								<div
									key={r}
									title="Show/Hide actors">
									<CheckBox
										label={r}
										value={this.state.filters.entity_type[r]}
										onClick={(v) => this.changeFilter("entity_type", r, v)}
									/>
								</div>
							))}
						</div>
					}
				</div>
			</div>
		);
	}
}
