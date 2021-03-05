import React from 'react';
import './GlobalMap.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Company from '../item/Company';
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import CheckBox from '../form/CheckBox';


export default class GlobalMap extends React.Component {

	constructor(props) {
		super(props);

		this.getIDsToDisplay = this.getIDsToDisplay.bind(this);

		this.state = {
		   lat: 49.8116,
		   lng: 6.1319,
		   zoom: 9,
		   selectedCompanyId: null,
		   showActors: true,
		   showPublicSector: true,
		   showCivilSociety: true,
		   showJobPlatforms: true,
		}
	}

	handlePopupOpen(companyId) {
		this.setState({ selectedCompanyId: companyId });
	}

	getIDsToDisplay() {
		return this.props.companies
			.filter(c => this.state.showActors || c.type !== "ACTOR")
			.filter(c => this.state.showPublicSector || c.type !== "PUBLIC SECTOR")
			.filter(c => this.state.showCivilSociety || c.type !== "CIVIL SOCIETY")
			.filter(c => this.state.showJobPlatforms || c.type !== "JOB PLATFORM")
			.map(c => c.id);
	}

	render() {
		return (
			<div className={"GlobalMap " + (this.props.fullpage ? "GlobalMap-fullpage" : "")}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: '100%', height: '100%' }}
				>
					{Array.isArray(this.props.addresses) ?
						this.props.addresses
							.filter(a => a.latitude !== null && a.longitude !== null)
							.filter(a => this.getIDsToDisplay().indexOf(a.company_id) >= 0)
							.map(a => {
								return (
									<div>
										<Marker 
											position={[a.latitude, a.longitude]}
											eventHandlers={{ click: (e) => { this.handlePopupOpen(a.company_id) }}}>
											<Popup
												companyId={a.company_id}
											>
												{this.props.companies.filter(c => c.id === this.state.selectedCompanyId).length > 0 ?
													this.props.companies.filter(c => c.id === this.state.selectedCompanyId)[0].name
													: "Unfound company"}
												<br/><a href={"/company/" + a.company_id}>More info</a>
											</Popup>
										</Marker>
									</div>
								);
							}
						)
					: ""}
					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
				<div className="GlobalMap-filters">
					<div title="Show/Hide actors">
						<CheckBox
							label={<i class="fas fa-shield-alt"/>}
							value={this.state.showActors}
							onClick={v => this.setState({ showActors: v })}
						/>
					</div>
					<div title="Show/Hide public sector">
						<CheckBox
							label={<i class="far fa-flag"></i>}
							value={this.state.showPublicSector}
							onClick={v => this.setState({ showPublicSector: v })}
						/>
					</div>
					<div title="Show/Hide civil society">
						<CheckBox
							label={<i class="fas fa-people-carry"/>}
							value={this.state.showCivilSociety}
							onClick={v => this.setState({ showCivilSociety: v })}
						/>
					</div>
					<div title="Show/Hide job platforms">
						<CheckBox
							label={<i class="fas fa-briefcase"/>}
							value={this.state.showJobPlatforms}
							onClick={v => this.setState({ showJobPlatforms: v })}
						/>
					</div>
				</div>
			</div>
		)
	}
}