import React from "react";
import "./PrivateSpaceRegisterACompany.css";
import { NotificationManager as nm } from "react-notifications";
import Collapsible from "react-collapsible";
import FormLine from "../form/FormLine.jsx";
import Address from "../form/Address.jsx";
import Loading from "../box/Loading.jsx";
import Message from "../box/Message.jsx";
import { getRequest, postRequest } from "../../utils/request.jsx";
import Company from "../item/Company.jsx";
import Info from "../box/Info.jsx";
import DialogConfirmation from "../dialog/DialogConfirmation.jsx";

export default class PrivateSpaceRegisterACompany extends React.Component {
	constructor(props) {
		super(props);

		this.submitCreationRequest = this.submitCreationRequest.bind(this);

		this.state = {
			newCompanyForm: {},
			addresses: [{}],

			fields: {
				name: "Name",
				type: "Type",
				description: "Description",
				rscl_number: "RCSL number",
				website: "Website",
				creation_date: "Creation date",
				is_cybersecurity_core_business: "Is cybersecurity core business",
				is_startup: "Is startup",
				is_targeting_sme: "Is targeting SMEs",
			},
		};
	}

	componentDidMount() {
	}

	submitCreationRequest() {
		const info = {
			company: this.state.newCompanyForm,
			addresses: this.state.addresses,
		};

		const params = {
			request: "[COMPANY INSERTION]\n\n"
				+ "The user requests the insertion of this company: \n\n"
				+ JSON.stringify(info, null, 4),
		};

		postRequest.call(this, "privatespace/add_request", params, (response) => {
			this.setState({
				entity: null,
			});
			nm.info("The request has been sent and will be reviewed");
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	updateNewCompany(field, value) {
		const c = JSON.parse(JSON.stringify(this.state.newCompanyForm));
		c[field] = value;
		this.setState({ newCompanyForm: c });
	}

	updateAddresses(index, field, value) {
		const c = JSON.parse(JSON.stringify(this.state.addresses));
		c[index][field] = value;
		this.setState({ addresses: c });
	}

	isFieldCompleted(v) {
		return v !== undefined && v.length > 0;
	}

	render() {
		return (
			<div className="PrivateSpaceRegisterACompany">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>Register a company</h2>
					</div>

					<div className="col-md-12">
						<h3>Global information</h3>
					</div>

					<div className="col-md-12">
						<FormLine
							label={this.state.fields.name}
							value={this.state.newCompanyForm.name}
							onChange={(v) => this.updateNewCompany("name", v)}
							format={(v) => this.isFieldCompleted(v)}
						/>
						<FormLine
							label={this.state.fields.description}
							type={"textarea"}
							value={this.state.newCompanyForm.description}
							onChange={(v) => this.updateNewCompany("description", v)}
						/>
						<FormLine
							label={this.state.fields.rscl_number}
							value={this.state.newCompanyForm.rscl_number}
							onChange={(v) => this.updateNewCompany("rscl_number", v)}
						/>
						<FormLine
							label={this.state.fields.website}
							value={this.state.newCompanyForm.website}
							onChange={(v) => this.updateNewCompany("website", v)}
							format={(v) => this.isFieldCompleted(v)}
						/>
						<FormLine
							label={this.state.fields.creation_date}
							type={"date"}
							value={this.state.newCompanyForm.creation_date}
							onChange={(v) => this.updateNewCompany("creation_date", v)}
							format={(v) => this.isFieldCompleted(v)}
						/>
						<FormLine
							label={this.state.fields.is_cybersecurity_core_business}
							type={"checkbox"}
							value={this.state.newCompanyForm.is_cybersecurity_core_business}
							onChange={(v) => this.updateNewCompany("is_cybersecurity_core_business", v)}
							background={false}
						/>
						<FormLine
							label={this.state.fields.is_startup}
							type={"checkbox"}
							value={this.state.newCompanyForm.is_startup}
							onChange={(v) => this.updateNewCompany("is_startup", v)}
							background={false}
						/>
						<FormLine
							label={this.state.fields.is_targeting_sme}
							type={"checkbox"}
							value={this.state.newCompanyForm.is_targeting_sme}
							onChange={(v) => this.updateNewCompany("is_targeting_sme", v)}
							background={false}
						/>
						<br/>
					</div>

					<div className="col-md-12">
						<h3>Address</h3>
					</div>

					<div className="col-md-12">
						<Address
							info={this.state.addresses[0]}
							onChange={(f, v) => this.updateAddresses(0, f, v)}
						/>
					</div>

					<div className="col-md-12">
						<div className={"right-buttons"}>
							<DialogConfirmation
								text={"Do you want to submit the company creation as a request?"}
								trigger={
									<button
										className={"blue-background"}
										disabled={
											!this.isFieldCompleted(this.state.newCompanyForm.name)
											|| !this.isFieldCompleted(this.state.newCompanyForm.website)
											|| !this.isFieldCompleted(this.state.newCompanyForm.creation_date)
											|| !this.isFieldCompleted(this.state.addresses[0].address_1)
											|| !this.isFieldCompleted(this.state.addresses[0].city)
											|| !this.isFieldCompleted(this.state.addresses[0].country)
										}
									>
										<i className="fas fa-save"/> Request registration
									</button>
								}
								afterConfirmation={this.submitCreationRequest}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
