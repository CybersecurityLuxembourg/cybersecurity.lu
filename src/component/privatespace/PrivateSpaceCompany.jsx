import React from 'react';
import './PrivateSpaceCompany.css';
import FormLine from '../form/FormLine';
import Loading from "../box/Loading";
import {getRequest} from '../../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Company from "../item/Company";
import Info from "../box/Info";


export default class PrivateSpaceCompany extends React.Component {

	constructor(props){
		super(props);

		this.refresh = this.refresh.bind(this);

		this.state = {
			companies: null,
			entity: null,
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
            });
        }, response => {
            nm.warning(response.statusText);
        }, error => {
            nm.error(error.message);
        });
	}

	submitRequest() {
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

	render() {
		return (
			<div className="PrivateSpaceCompany">
				<div className={"row row-spaced"}>
					<div className="col-md-12">
						<h2>My companies</h2>
					</div>

					{this.state.companies !== null ?
						this.state.companies.map(c => { return (
							<div className="col-md-12">
								<Company
                                    info={c}
                                />
			                    {/*<FormLine
			                        label={"Name"}
			                        value={c.name}
			                        onBlur={v => this.saveCompanyValue("name", v)}
			                    />
			                    <FormLine
			                        label={"Type"}
			                        value={c.type}
			                        onBlur={v => this.saveCompanyValue("type", v)}
			                    />
			                    <FormLine
			                        label={"Description"}
			                        type={"textarea"}
			                        value={c.description}
			                        onBlur={v => this.saveCompanyValue("description", v)}
			                    />
			                    <FormLine
			                        label={"RCSL number"}
			                        value={c.rscl_number}
			                        onBlur={v => this.saveCompanyValue("rscl_number", v)}
			                    />
			                    <FormLine
			                        label={"Website"}
			                        value={c.website}
			                        onBlur={v => this.saveCompanyValue("website", v)}
			                    />
			                    <FormLine
			                        label={"Creation date"}
			                        type={"date"}
			                        value={c.creation_date}
			                        onChange={v => this.saveCompanyValue("creation_date", v)}
			                    />
			                    <FormLine
			                        label={"Is cybersecurity core business"}
			                        type={"checkbox"}
			                        value={c.is_cybersecurity_core_business}
			                        onChange={v => this.saveCompanyValue("is_cybersecurity_core_business", v)}
			                    />
			                    <FormLine
			                        label={"Is startup"}
			                        type={"checkbox"}
			                        value={c.is_startup}
			                        onChange={v => this.saveCompanyValue("is_startup", v)}
			                    />
			                    <FormLine
			                        label={"Is targeting SMEs"}
			                        type={"checkbox"}
			                        value={c.is_targeting_sme}
			                        onChange={v => this.saveCompanyValue("is_targeting_sme", v)}
			                    />*/}
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