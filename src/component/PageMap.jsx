import React from 'react';
import './PageMap.css';
import GlobalMap from './map/GlobalMap';
import {getRequest} from '../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Loading from "./box/Loading";


export default class PageMap extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			actors: null,
			publicEntities: null,
			civilSociety: null,
			jobPlatforms: null,
			geolocations: null,
		}
	}

	componentDidMount() {
		this.getCompanies();
	}

	getCompanies() {
		getRequest.call(this, "public/get_public_companies", data => {
			this.setState({
				actors: data.filter(c => c.type === "ACTOR"),
				publicEntities: data.filter(c => c.type === "PUBLIC SECTOR"),
				civilSociety: data.filter(c => c.type === "CIVIL SOCIETY"),
				jobPlatforms: data.filter(c => c.type === "JOB PLATFORM"),
			}, () => {
				getRequest.call(this, "public/get_public_company_geolocations", data => {
					this.setState({
						geolocations: data,
					});
				}, response => {
					nm.warning(response.statusText);
				}, error => {
					nm.error(error.message);
				})
			});
		}, response => {
			nm.warning(response.statusText);
		}, error => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id="PageMap">
				<GlobalMap
					addresses={this.state.geolocations}
					companies={this.state.actors !== null ? this.state.actors.concat(
						this.state.publicEntities, 
						this.state.civilSociety, 
						this.state.jobPlatforms
					) : []}
					fullpage={true}
				/>
			</div>
		);
	}
}