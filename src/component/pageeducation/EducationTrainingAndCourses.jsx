import React from "react";
import "./EducationTrainingAndCourses.css";
import { NotificationManager as nm } from "react-notifications";
import { getRequest } from "../../utils/request.jsx";
import ServiceHorizontal from "../item/ServiceHorizontal.jsx";
import DynamicTable from "../table/DynamicTable.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { dictToURI } from "../../utils/url.jsx";

export default class EducationTrainingAndCourses extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			educationServices: null,
		};
	}

	componentDidMount() {
		this.getEducationServices();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.analytics === null && this.props.analytics !== null) {
			this.getEducationServices();
		}
	}

	getEducationServices(page) {
		const params = {
			type: "SERVICE",
			page: page || 1,
			per_page: 5,
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
	}

	render() {
		return (
			<div id={"EducationTrainingAndCourses"} className={"page max-sized-page"}>
				<div className="row row-spaced">
					<div className="col-md-12">
						<h2>Training and courses</h2>
					</div>

					<div className="col-md-12">
						{this.state.educationServices && this.state.educationServices.pagination.total > 0
							&& <DynamicTable
								items={this.state.educationServices.items}
								pagination={this.state.educationServices.pagination}
								changePage={(page) => this.getEducationServices(page)}
								buildElement={(a) => <div className="col-md-12">
									<ServiceHorizontal
										info={a}
										analytics={this.props.analytics}
									/>
								</div>
								}
							/>
						}

						{this.state.educationServices && this.state.educationServices.pagination.total === 0
							&& <Message
								text={"No entity found"}
								height={300}
							/>
						}

						{!this.state.educationServices
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
