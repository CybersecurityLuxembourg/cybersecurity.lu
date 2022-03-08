import React from "react";
import "./FrameworkPage.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import ToolHorizontal from "../item/ToolHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class FrameworkPage extends React.Component {
	constructor(props) {
		super(props);

		this.getFrameworks = this.getFrameworks.bind(this);

		this.state = {
			objects: null,
		};
	}

	componentDidMount() {
		this.getFrameworks();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getFrameworks();
		}
	}

	getFrameworks(page) {
		if (this.props.analytics !== null
			&& this.props.analytics.taxonomy_values !== undefined) {
			this.setState({
				objects: null,
			});

			const taxonomyValues = this.props.analytics.taxonomy_values
				.filter((v) => v.category === "TOOL CATEGORY"
					&& v.name === this.props.taxonomyValueName)
				.map((v) => v.id);

			if (taxonomyValues.length > 0) {
				const params = {
					type: "TOOL",
					taxonomy_values: taxonomyValues,
					page: page === undefined ? 1 : page,
					include_tags: "true",
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
			<div className={"FrameworkPage page max-sized-page"}>
				<h1>{this.props.taxonomyValueName}</h1>

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
								analytics={this.props.analytics}
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
