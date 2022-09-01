import React from "react";
import "./CyberWeekExhibitionArea.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import Entity from "../item/Entity.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class CyberWeekExhibitionArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entities: null,
		};
	}

	componentDidMount() {
		this.getExhibitorEntities();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.analytics && this.props.analytics) {
			this.getExhibitorEntities();
		}
	}

	getExhibitorEntities() {
		if (this.props.analytics) {
			const valueId = this.getSponsorTaxonomyValues().map((v) => v.id);

			if (valueId.length > 0) {
				this.setState({
					entities: null,
				}, () => {
					const params = {
						taxonomy_values: valueId,
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
				.filter((v) => v.category === "CYBERSECURITY WEEK SPONSOR 2022")
				.filter((v) => v.name === "EXHIBITORS");
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
			<div id={"CyberWeekExhibitionArea"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Exhibition area</h2>
					</div>

					<div className="col-md-12">
						{this.getSponsorTaxonomyValues()
							&& this.state.entities
							&& this.state.entities.filter((e) => e.is_startup !== 1).length > 0
							&& <div className="row">
								<div className="col-md-12">
									<h3>Exhibitors</h3>
								</div>

								{this.state.entities.filter((e) => e.is_startup !== 1)
									.map((c) => (
										<div className="col-md-6" key={c.id}>
											<Entity
												info={c}
											/>
										</div>
									))
								}
							</div>
						}

						{this.getSponsorTaxonomyValues()
							&& this.state.entities
							&& this.state.entities.filter((e) => e.is_startup === 1).length > 0
							&& <div className="row">
								<div className="col-md-12">
									<h3>Exhibitors - Startup</h3>
								</div>

								{this.state.entities.filter((e) => e.is_startup === 1)
									.map((c) => (
										<div className="col-md-6" key={c.id}>
											<Entity
												info={c}
											/>
										</div>
									))
								}
							</div>
						}

						{this.state.entities
							&& this.state.entities.length === 0
							&& <div className="col-md-12">
								<Message
									text={"No entity found"}
									height={300}
								/>
							</div>
						}

						{(!this.getSponsorTaxonomyValues()
							|| !this.state.entities)
							&& <div className="col-md-12">
								<Loading
									height={300}
								/>
							</div>
						}
					</div>
				</div>

				<div className="row row-spaced"/>
				<div className="row row-spaced"/>
			</div>
		);
	}
}
