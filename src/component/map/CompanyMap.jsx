import React from "react";
import "./GlobalMap.css";
import {
	MapContainer, TileLayer, Marker,
} from "react-leaflet";
import L from "leaflet";

export default class GlobalMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			lat: 49.8116,
			lng: 6.1319,
			zoom: 8,
		};
	}

	render() {
		const thisIcon = new L.Icon({
			iconUrl: "/img/marker-icon-2x.png",
			iconSize: [24, 36],
			iconAnchor: [12, 36],
			popupAnchor: [0, -36],
		});

		return (
			<div className={"CompanyMap"}>
				<MapContainer
					center={[this.state.lat, this.state.lng]}
					zoom={this.state.zoom}
					style={{ width: "100%", height: "100%" }}
				>

					{Array.isArray(this.props.geolocations)
						? this.props.geolocations
							.filter((a) => a.latitude !== null && a.longitude !== null)
							.map((a) => (
								<div key={a.company_id}>
									<Marker
										position={[a.latitude, a.longitude]}
										icon={thisIcon}
									/>
								</div>
							))
						: ""}

					<TileLayer
						attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</MapContainer>
			</div>
		);
	}
}
