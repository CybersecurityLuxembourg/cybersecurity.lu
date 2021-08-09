import React from "react";
import "./CadreLegalNational.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ToolHorizontal from "../item/ToolHorizontal.jsx";

export default class CadreLegalNational extends React.Component {
	constructor(props) {
		super(props);

		this.getNationalLegalFrameworks = this.getNationalLegalFrameworks.bind(this);

		this.state = {
			objects: null,
		};
	}

	componentDidMount() {
		this.getNationalLegalFrameworks();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getNationalLegalFrameworks();
		}
	}

	getNationalLegalFrameworks() {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				objects: null,
			});

			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& v.name === "NATIONAL LEGAL FRAMEWORK")
				.map((v) => v.id);

			if (taxonomyValues.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: taxonomyValues,
				};

				getRequest.call(this, "public/get_public_articles?" + dictToURI(params), (data) => {
					this.setState({
						objects: data,
					});
				}, (response) => {
					nm.warning(response.statusText);
				}, (error) => {
					nm.error(error.message);
				});
			}
		}
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className={"CadreLegalNational page max-sized-page"}>
				<h1>Cadre légal national</h1>

				<p>&nbsp;</p>

				{this.state.objects !== null && this.state.objects.items.length === 0
					&& <div className="col-md-12">
						<Message
							text={"No object found"}
							height={300}
						/>
					</div>
				}

				{this.state.objects !== null && this.state.objects.items.length > 0
					&& this.state.objects.items.map((e) => (
						<div className="col-md-12" key={e.id}>
							<ToolHorizontal
								info={e}
							/>
						</div>
					))
				}

				{this.state.objects === null
					&& <div className="col-md-12">
						<Loading
							height={300}
						/>
					</div>
				}

				<p>&nbsp;</p>
			</div>
		);
	}
}
