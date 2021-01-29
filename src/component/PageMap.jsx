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
		}
	}

	componentDidMount() {
	}


	render() {
		return (
			<div id="PageMap">
				<GlobalMap
					
				/>
			</div>
		);
	}
}