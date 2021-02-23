import React from 'react';
import './PrivateSpaceCompany.css';
import FormLine from '../form/FormLine';
import Loading from "../box/Loading";
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Company from "../item/Company";
import Info from "../box/Info";
import DialogConfirmation from "../dialog/DialogConfirmation";
import Collapsible from 'react-collapsible';


export default class PrivateSpaceCompany extends React.Component {

	constructor(props){
		super(props);

		this.refresh = this.refresh.bind(this);
		this.submitModificationRequests = this.submitModificationRequests.bind(this);
		this.submitCompanyRequest = this.submitCompanyRequest.bind(this);
		this.updateCompanies = this.updateCompanies.bind(this);

		this.state = {
			originalCompanies: null,
			companies: null,
			entity: null,
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
			}
		}
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.setState({
			companies: null
		});

		getRequest.call(this, "privatespace/get_my_companies", data => {
            this.setState({
                companies: data,
                originalCompanies: data,
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	submitModificationRequests() {
		let params = {
            request: "The user requests the access to this company: " + this.state.entity
        }

        postRequest.call(this, "privatespace/add_request", params, response => {
        	this.setState({
                entity: null,
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	submitCompanyRequest() {
		let params = {
            request: "The user requests the access to this company: " + this.state.entity
        }

        postRequest.call(this, "privatespace/add_request", params, response => {
        	this.setState({
                entity: null,
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	getModifiedFields(c1, c2) {
		let fields = "";

		Object.entries(c1).forEach(([key, value]) => {
			if (c1[key] !== c2[key])
		   		fields += this.state.fields[key] + ", "
		});

		if (fields.length > 2)
			fields = fields.slice(0, -2)

		return fields
	}

	updateCompanies(index, field, value) {
        let c = JSON.parse(JSON.stringify(this.state.companies));
        c[index][field] = value;
        this.setState({ companies : c })
    }

	render() {
		return (
			<div className="PrivateSpaceCompany">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>My companies</h2>
					</div>

					{this.state.companies !== null ?
						this.state.companies.map((c, i) => { return (
							<div className="col-md-12">
								<Company
                                    info={c}
                                />
                                <Collapsible 
                                	trigger={<div className={"PrivateSpaceCompany-show-detail"}>Show details</div>}
                                >
                                    <FormLine
				                        label={this.state.fields["name"]}
				                        value={c.name}
				                        onChange={v => this.updateCompanies(i, "name", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["type"]}
				                        value={c.type}
				                        disabled={true}
				                    />
				                    <FormLine
				                        label={this.state.fields["description"]}
				                        type={"textarea"}
				                        value={c.description}
				                        onChange={v => this.updateCompanies(i, "description", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["rscl_number"]}
				                        value={c.rscl_number}
				                        onChange={v => this.updateCompanies(i, "rscl_number", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["website"]}
				                        value={c.website}
				                        onChange={v => this.updateCompanies(i, "website", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["creation_date"]}
				                        type={"date"}
				                        value={c.creation_date}
				                        onChange={v => this.updateCompanies(i, "creation_date", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["is_cybersecurity_core_business"]}
				                        type={"checkbox"}
				                        value={c.is_cybersecurity_core_business}
				                        onChange={v => this.updateCompanies(i, "is_cybersecurity_core_business", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["is_startup"]}
				                        type={"checkbox"}
				                        value={c.is_startup}
				                        onChange={v => this.updateCompanies(i, "is_startup", v)}
				                    />
				                    <FormLine
				                        label={this.state.fields["is_targeting_sme"]}
				                        type={"checkbox"}
				                        value={c.is_targeting_sme}
				                        onChange={v => this.updateCompanies(i, "is_targeting_sme", v)}
				                    />
				                    <div className={"right-buttons"}>
		                                <DialogConfirmation
				                            text={"Do you want to request modifications for those fields : " +
				                        		this.getModifiedFields(c, this.state.originalCompanies[i]) + " ?"}
				                            trigger={
				                                <button
				                                    className={"blue-background"}
				                                    disabled={_.isEqual(c, this.state.originalCompanies[i])}
				                                >
				                                    <i className="fas fa-save"/> Request modifications
				                                </button>
				                            }
				                            afterConfirmation={this.submitModificationRequests}
				                        />
		                            </div>
                                </Collapsible>
		           			</div>
		           		)})
           			: 
           				<Loading
                        	height={300}
                        />
                    }
                </div>

                <div className={"row row-spaced"}>
                    <div className="col-md-12">
						<h2>Claim access to a company</h2>
					</div>

					<div className="col-md-12">
						<Info
                            content={
                            	<div>
                            		You can request to have control of the data of the entity you are part of.<br/><br/>
                            		To confirm the access granting, one of out operator will get contact with you in the shortest delay.<br/>
                            		Make sure you have filled your personal information in the <b>Account</b> section.
                            	</div>
                        	}
                        />
	                    <FormLine
	                        label={"Name of the entity"}
	                        fullWidth={true}
	                        value={this.state.entity}
	                        onChange={v => this.setState({ "entity": v })}
	                    />
	                    <div className="right-buttons">
		                    <button
		                        onClick={() => this.save()}
		                        disabled={this.state.entity === null || this.state.entity.length === 0}>
		                        <i class="fas fa-paper-plane"/> Send
		                    </button>
		                </div>
           			</div>
				</div>
			</div>
		);
	}
}