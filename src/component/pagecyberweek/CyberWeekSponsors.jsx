import React from "react";
import "./CyberWeekSponsors.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Entity from "../item/Entity.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class CyberWeekSponsors extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entities: null,
			// The shown order is reversed
			awardOrder: ["WITH THE SUPPORT OF", "EXHIBITORS", "GOLD", "DIAMOND", "PLATINUM"],
		};
	}

	componentDidMount() {
		this.getSponsorEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getSponsorEntities();
		}
	}

	getSponsorEntities() {
		if (this.props.analytics) {
			const valueId = this.getSponsorTaxonomyValues().map((v) => v.id);

			if (valueId.length > 0) {
				this.setState({
					entities: null,
				}, () => {
					const params = {
						ids: this.props.analytics.taxonomy_assignments
							.filter((a) => valueId.indexOf(a.taxonomy_value_id) >= 0)
							.map((a) => a.entity_id),
					};

					getRequest.call(this, "public/get_public_entities?" + dictToURI(params), (data) => {
						this.setState({
							entities: data,
						});
					}, (response) => {
						nm.warning(response.statusText);
					}, (error) => {
						nm.error(error.message);
					});
				});
			} else {
				this.setState({
					entities: [],
				});
			}
		}
	}

	getSponsorTaxonomyValues() {
		if (this.props.analytics) {
			return this.props.analytics.taxonomy_values
				.filter((v) => v.category === "CYBERSECURITY WEEK SPONSOR 2022");
		}

		return undefined;
	}

	getEntitiesOfTaxonomyValue(v) {
		if (this.props.analytics && this.state.entities) {
			const assignedEntities = this.props.analytics.taxonomy_assignments
				.filter((a) => a.taxonomy_value_id === v.id)
				.map((a) => (a.entity_id));

			return this.state.entities
				.filter((e) => assignedEntities.indexOf(e.id) >= 0);
		}

		return undefined;
	}

	render() {
		return (
			<div id={"CyberWeekSponsors"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Sponsors</h2>
					</div>

					<div className="col-md-12">
						{this.getSponsorTaxonomyValues()
							&& this.state.entities
							&& this.state.entities.length > 0
							&& this.getSponsorTaxonomyValues()
								.sort((a, b) => this.state.awardOrder.indexOf(b.name)
									- this.state.awardOrder.indexOf(a.name))
								.map((v) => (
									this.getEntitiesOfTaxonomyValue(v).length > 0
										&& <div className="row" key={v.id}>
											<div className="col-md-12">
												<h3>{v.name}</h3>
											</div>

											{this.getEntitiesOfTaxonomyValue(v).length > 0
												&& this.getEntitiesOfTaxonomyValue(v).map((c) => (
													<div className="col-md-6" key={c.id}>
														<Entity
															info={c}
														/>
													</div>
												))}

											{this.getEntitiesOfTaxonomyValue(v).length === 0
												&& <div className="col-md-12">
													<Message
														text={"No entity for this sponsorship"}
													/>
												</div>
											}
										</div>
								))
						}

						{this.state.entities
							&& this.state.entities.length === 0
							&& <Message
								text={"No entity found"}
								height={300}
							/>
						}

						{(!this.getSponsorTaxonomyValues()
							|| !this.state.entities)
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
