import React from "react";
import "./EducationScholarship.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Entity from "../item/Entity.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";
import ServiceHorizontal from "../item/ServiceHorizontal.jsx";

export default class EducationScholarship extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			educationEntities: null,
			educationServices: null,
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
				.filter((v) => v.category === "ECOSYSTEM ROLE" && v.name === "EDUCATIONAL INSTITUTION")
				.map((v) => v.id);

			if (valueId.length > 0) {
				this.setState({
					educationEntities: null,
				}, () => {
					getRequest.call(this, "public/get_public_entities"
						+ "?taxonomy_values=" + valueId.join(","), (data) => {
						this.setState({
							educationEntities: data,
						}, () => {
							this.getServicesOfEducationEntities();
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

	getServicesOfEducationEntities() {
		if (this.state.educationEntities && this.state.educationEntities.length > 0) {
			const params = {
				type: "SERVICE",
				include_tags: true,
				entities: this.state.educationEntities.map((e) => (e.id)),
			};

			getRequest.call(this, "public/get_public_articles?"
				+ dictToURI(params), (data) => {
				this.setState({
					educationServices: data,
				});
			}, (response) => {
				nm.warning(response.statusText);
			}, (error) => {
				nm.error(error.message);
			});
		} else {
			this.setState({
				educationServices: { pagination: { total: 0 } },
			});
		}
	}

	render() {
		return (
			<div id={"EducationScholarship"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Scholarship</h2>
					</div>

					<div className="col-md-12">
						{this.state.educationEntities && this.state.educationEntities.length > 0
							&& this.state.educationEntities.map((e) => (
								<div className="row row-spaced" key={e.id}>
									<div className="col-md-12">
										<Entity
											info={e}
										/>
									</div>

									{this.state.educationServices
										&& this.state.educationServices.items
											.filter((s) => s.entity_tags.indexOf(e.id) >= 0)
											.map((s) => (
												<div className="col-md-10 offset-md-1" key={s.id}>
													<ServiceHorizontal
														info={s}
														analytics={this.props.analytics}
													/>
												</div>
											))
									}

									{!this.state.educationServices
										&& <Loading
											height={100}
										/>
									}
								</div>
							))
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
