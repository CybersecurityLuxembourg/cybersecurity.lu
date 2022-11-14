import React from "react";
import "./CyberWeekContactUs.css";
import { NotificationManager as nm } from "react-notifications";
import ShadowBox from "../box/ShadowBox.jsx";

export default class CyberWeekContactUs extends React.Component {
	static copyToClipboard(text) {
		const dummy = document.createElement("input");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		dummy.setSelectionRange(0, 99999);
		document.execCommand("copy");
		document.body.removeChild(dummy);
		nm.info("Copied to clipboard!");
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div id={"CyberWeekContactUs"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Contact us</h2>
					</div>

					<div className="col-md-12 row-spaced">
						<h3>Contact the Cybersecurity Week organisation team via:</h3>
					</div>

					<div className="col-md-2"/>

					<div className="col-md-4">
						<ShadowBox
							onClick={() => CyberWeekContactUs.copyToClipboard("+352 274 00 98 601")}
							title={"Phone"}
							icon={"fas fa-phone"}
							abstract={"+352 274 00 98 601"}
						/>
					</div>

					<div className="col-md-4">
						<ShadowBox
							onClick={() => CyberWeekContactUs.copyToClipboard("info@cybersecurityweek.lu")}
							title={"Email"}
							icon={"fas fa-at"}
							abstract={"info@cybersecurityweek.lu"}
						/>
					</div>

					<div className="col-md-4"/>

					<div className="col-md-4">
						<ShadowBox
							onClick={() => window.open("https://frontoffice.byemisys.com/auth/CibersecurityWeek2022/fr/login", "_blank")}
							title={"Payment bracelets"}
							icon={"fas fa-coins"}
							abstract={"To obtain a refund of the remaining balance on your bracelet, click here"}
						/>
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
