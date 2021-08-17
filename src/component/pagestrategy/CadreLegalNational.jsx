import React from "react";
import "./CadreLegalNational.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ToolHorizontal from "../item/ToolHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

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

	getNationalLegalFrameworks(page) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				objects: null,
			});

			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& v.name === "NATIONAL FRAMEWORK")
				.map((v) => v.id);

			if (taxonomyValues.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: taxonomyValues,
					page: page === undefined ? 1 : page,
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

	render() {
		return (
			<div className={"CadreLegalNational page max-sized-page"}>
				<h1>National framework</h1>

				{this.state.objects !== null && this.state.objects.items.length === 0
					&& <div className="col-md-12">
						<Message
							text={"No object found"}
							height={200}
						/>
					</div>
				}

				{this.state.objects !== null && this.state.objects.items.length > 0
					&& <DynamicTable
						items={this.state.objects.items}
						pagination={this.state.objects.pagination}
						changePage={(page) => this.getNationalLegalFrameworks(page)}
						buildElement={(t) => <div className="col-md-12">
							<ToolHorizontal
								info={t}
							/>
						</div>
						}
					/>
				}

				{this.state.objects === null
					&& <div className="col-md-12">
						<Loading
							height={200}
						/>
					</div>
				}

				<p>&nbsp;</p>
			</div>
		);
	}
}
