import React from "react";
import "./PageStrategy.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Tab from "./tab/Tab.jsx";
import StrategieNational from "./pagestrategy/StrategieNational.jsx";
import CadreLegalNational from "./pagestrategy/CadreLegalNational.jsx";
import CadreLegalInternational from "./pagestrategy/CadreLegalInternational.jsx";

export default class PageStrategy extends React.Component {
	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"PageStrategy page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/strategy">Strategy</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<Tab
					menu={[
						"National strategy",
						"Cadre légal national",
						"Cadre légal international",
					]}
					content={[
						<StrategieNational
							key="StrategieNational"
						/>,
						<CadreLegalNational
							key="CadreLegalNational"
						/>,
						<CadreLegalInternational
							key="StrategieNational"
						/>,
					]}
				/>
			</div>
		);
	}
}
