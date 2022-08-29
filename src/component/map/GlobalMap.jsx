import React from "react";
import "./GlobalMap.css";
import {
	MapContainer, TileLayer, Marker, Popup,
} from "react-leaflet";
import L from "leaflet";
import _ from "lodash";
import { NotificationManager as nm } from "react-notifications";
import CheckBox from "../form/CheckBox.jsx";
import { getRequest } from "../../utils/request.jsx";

export default class GlobalMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 49.8116,
			lng: 6.1319,
			zoom: 9,
			selectedEntityId: null,
			entities: null,
			entityGeolocations: null,
			filters: {
				entity_type: {},
			},
		};
	}

	componentDidMount() {
		this.getEntities();
	}

	componentDidUpdate(prevProps) {
		if (this.props.analytics
			&& (this.props.analytics !== prevProps.analytics
				|| Object.keys(this.state.filters.entity_type).length === 0)) {
			const filters = _.cloneDeep(this.state.filters);
			this.props.analytics.taxonomy_values.filter((v) => v.category === "ENTITY TYPE").forEach((v) => {
				filters.entity_type[v.name] = true;
			});
			this.setState({ filters });
		}
	}

	getEntities() {
		getRequest.call(this, "public/get_public_entities", (data) => {
			this.setState({
				entities: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});

		getRequest.call(this, "public/get_public_entity_geolocations", (data) => {
			this.setState({
				entityGeolocations: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getEntitiesToShow() {
		if (!this.state.entities
			|| !this.state.entityGeolocations
			|| !this.props.analytics) {
			return undefined;
		}

		let entities = [];
		let values = null;

		if (Object.keys(this.state.filters.entity_type).indexOf("PRIVATE SECTOR") >= 0
			&& this.state.filters.entity_type["PRIVATE SECTOR"]) {
			values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE" && v.name === "PRIVATE SECTOR");

			if (values.length > 0) {
				let selectedIds = this.props.analytics.taxonomy_assignments
					.filter((a) => a.taxonomy_value_id === values[0].id)
					.map((a) => a.entity_id);

				values = this.props.analytics.taxonomy_values
					.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "ACTOR");

				if (values.length > 0) {
					const selectedIds2 = this.props.analytics.taxonomy_assignments
						.filter((a) => a.taxonomy_value_id === values[0].id)
						.map((a) => a.entity_id);

					selectedIds = selectedIds.filter((value) => selectedIds2.includes(value));

					entities = entities.concat(
						this.state.entityGeolocations.filter((c) => selectedIds.indexOf(c.entity_id) >= 0),
					);
				}
			}
		}

		if (Object.keys(this.state.filters.entity_type).indexOf("PUBLIC SECTOR") >= 0
			&& this.state.filters.entity_type["PUBLIC SECTOR"]) {
			values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE" && v.name === "PUBLIC SECTOR");

			if (values.length > 0) {
				const selectedIds = this.props.analytics.taxonomy_assignments
					.filter((a) => a.taxonomy_value_id === values[0].id)
					.map((a) => a.entity_id);

				entities = entities.concat(
					this.state.entityGeolocations.filter((c) => selectedIds.indexOf(c.entity_id) >= 0),
				);
			}
		}

		if (Object.keys(this.state.filters.entity_type).indexOf("CIVIL SOCIETY") >= 0
			&& this.state.filters.entity_type["CIVIL SOCIETY"]) {
			values = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "ENTITY TYPE" && v.name === "CIVIL SOCIETY");

			if (values.length > 0) {
				const selectedIds = this.props.analytics.taxonomy_assignments
					.filter((a) => a.taxonomy_value_id === values[0].id)
					.map((a) => a.entity_id);

				entities = entities.concat(
					this.state.entityGeolocations.filter((c) => selectedIds.indexOf(c.entity_id) >= 0),
				);
			}
		}

		return entities;
	}

	handlePopupOpen(entityId) {
		this.setState({ selectedEntityId: entityId });
	}

	changeFilter(category, value, v) {
		const filters = _.cloneDeep(this.state.filters);
		filters[category][value] = v;
		this.setState({ filters });
	}

	render() {
		const thisIcon = new L.Icon({
			iconUrl: "/img/marker-icon-2x.png",
			iconSize: [24, 36],
			iconAnchor: [12, 36],
			popupAnchor: [0, -36],
		});

		return (
			<div className={"GlobalMap GlobalMap-fullpage"}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: "100%", height: "100%" }}
				>

					{Array.isArray(this.getEntitiesToShow())
						? this.getEntitiesToShow()
							.filter((a) => a.latitude !== null && a.longitude !== null)
							.map((a) => (
								<div key={a.entity_id}>
									<Marker
										position={[a.latitude, a.longitude]}
										icon={thisIcon}
										eventHandlers={{ click: () => { this.handlePopupOpen(a.entity_id); } }}>
										<Popup
											entityId={a.entity_id}
										>
											{this.state.entities !== null && this.state.entities
												.filter((c) => c.id === this.state.selectedEntityId).length > 0
												? this.state.entities
													.filter((c) => c.id === this.state.selectedEntityId)[0].name
												: "Unfound entity"}
											<br/><a href={"/entity/" + a.entity_id}>More info</a>
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
					{this.state.filters !== undefined && this.state.filters.entity_type !== undefined
						&& Object.keys(this.state.filters.entity_type).map((r) => (
							<div className="row" key={r}>
								<div className="col-md-8">
									<h3>SHOW {r}</h3>
								</div>
								<div
									className="col-md-4"
									title="Show/Hide actors">
									<CheckBox
										value={this.state.filters.entity_type[r]}
										onClick={(v) => this.changeFilter("entity_type", r, v)}
									/>
								</div>
							</div>
						))
					}
				</div>
			</div>
		);
	}
}
