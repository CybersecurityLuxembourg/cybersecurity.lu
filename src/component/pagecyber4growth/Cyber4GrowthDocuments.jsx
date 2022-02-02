import React from "react";
import "./Cyber4GrowthDocuments.css";
import { NotificationManager as nm } from "react-notifications";
import { dictToURI } from "../../utils/url.jsx";
import { getRequest } from "../../utils/request.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import DocumentHorizontal from "../item/DocumentHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";

export default class Cyber4GrowthDocuments extends React.Component {
	constructor(props) {
		super(props);

		this.getDocuments = this.getDocuments.bind(this);

		this.state = {
			documents: null,
		};
	}

	componentDidMount() {
		this.getDocuments();
	}

	getDocuments(page) {
		this.setState({
			documents: null,
		});

		const params = {
			search: "cyber4growth",
			page: page === undefined ? 1 : page,
		};

		getRequest.call(this, "public/get_public_documents?" + dictToURI(params), (data) => {
			this.setState({
				documents: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	render() {
		return (
			<div id={"Cyber4GrowthServices"} className={"page max-sized-page"}>
				<h2>Documents</h2>

				{this.state.documents && this.state.documents.pagination.total === 0
					&& <div className="col-md-12">
						<Message
							text={"No document found"}
							height={200}
						/>
					</div>
				}

				{this.state.documents && this.state.documents.pagination.total > 0
					&& <DynamicTable
						items={this.state.documents.items}
						pagination={this.state.documents.pagination}
						changePage={(page) => this.getDocuments(page)}
						buildElement={(t) => <div className="col-md-12">
							<DocumentHorizontal
								info={t}
							/>
						</div>
						}
					/>
				}

				{!this.state.documents
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
