import React from "react";
import "./CyberWeekPhotos.css";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekPhotos extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekPhotos"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Photos</h2>
					</div>

					<div className="offset-md-3"/>

					<div className="col-md-6">
						<ShadowBox
							onClick={() => window.open("https://www.flickr.com/photos/196854501@N08/albums/with/72177720303146523", "_blank")}
							title={"Photos"}
							icon={"fas fa-images"}
							color={"blue"}
						/>
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
