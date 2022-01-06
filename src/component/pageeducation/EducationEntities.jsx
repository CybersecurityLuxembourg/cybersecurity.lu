import React from "react";
import "./EducationEntities.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Company from "../item/Company.jsx";
import SimpleTable from "../table/SimpleTable.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";

export default class EducationEntities extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			educationEntities: null,
		};
	}

	componentDidMount() {
		this.getEducationEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getEducationEntities();
		}
	}

	getEducationEntities() {
		if (this.props.analytics) {
			const valueId = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "INDUSTRY VERTICAL" && v.name === "EDUCATION")
				.map((v) => v.id);

			if (valueId.length > 0) {
				this.setState({
					educationEntities: null,
				}, () => {
					getRequest.call(this, "public/get_public_companies"
						+ "?taxonomy_values=" + valueId.join(","), (data) => {
						this.setState({
							educationEntities: data,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			} else {
				this.setState({
					educationEntities: [],
				});
			}
		}
	}

	render() {
		return (
			<div id={"EducationEntities"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Entities</h2>
					</div>

					<div className="col-md-12">
						{this.state.educationEntities && this.state.educationEntities.length > 0
							&& <SimpleTable
								numberDisplayed={6}
								elements={this.state.educationEntities.map((a, i) => [a, i])}
								buildElement={(a) => (
									<div className="col-md-6">
										<Company
											info={a}
										/>
									</div>
								)}
							/>
						}

						{this.state.educationEntities && this.state.educationEntities.length === 0
							&& <Message
								text={"No entity found"}
								height={300}
							/>
						}

						{!this.state.educationEntities
							&& <Loading
								height={300}
							/>
						}
					</div>
				</div>
			</div>
		);
	}
}
