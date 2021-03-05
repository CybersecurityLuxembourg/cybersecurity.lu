import React from 'react';
import './PageCompany.css';
import Lock from "./box/Lock";
import {getRequest} from '../utils/request';
import {getApiURL} from '../utils/env';
import {NotificationManager as nm} from 'react-notifications';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import Loading from "./box/Loading";
import Chip from './form/Chip';
import Collapsible from 'react-collapsible';
import Message from "./box/Message";
import Article from './item/Article';
import Company from "./item/Company";
import FormLine from "./form/FormLine";


export default class PageCompany extends React.Component {

	constructor(props){
		super(props);

		this.getCompanyContent = this.getCompanyContent.bind(this);

		this.state = {
			company: null,
		}
	}

	componentDidMount() {
		this.getCompanyContent()
	}

	getCompanyContent() {
		getRequest.call(this, "public/get_public_company/" + this.props.match.params.id, data => {
			this.setState({
				company: data,
			});
		}, response => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, error => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({[field]: value});
	}

	render() {
		return(
			<div className={"PageCompany page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/ecosystem">COMPANY</Link></Breadcrumb.Item>
							{this.state.company !== null && !this.state.loading ?
							<Breadcrumb.Item><Link to={"/company/" + this.state.company.id}>{this.state.company.name}</Link></Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				{this.state.company !== null ? 
					<div className="row row-spaced">
						<div className="col-md-12">
							<Company
								info={this.state.company}
							/>
						</div>
						<div className="col-md-12">
							<FormLine
								label={"Name"}
								value={this.state.company.name}
								disabled={true}
								onBlur={v => this.saveCompanyValue("name", v)}
							/>
							<FormLine
								label={"Description"}
								type={"textarea"}
								value={this.state.company.description}
								disabled={true}
							/>
							<FormLine
								label={"RCSL number"}
								value={this.state.company.rscl_number}
								disabled={true}
							/>
							<FormLine
								label={"Website"}
								value={this.state.company.website}
								disabled={true}
							/>
							<FormLine
								label={"Creation date"}
								type={"date"}
								value={this.state.company.creation_date}
								disabled={true}
							/>
							<FormLine
								label={"Is cybersecurity core business"}
								type={"checkbox"}
								value={this.state.company.is_cybersecurity_core_business}
								disabled={true}
							/>
							<FormLine
								label={"Is startup"}
								type={"checkbox"}
								value={this.state.company.is_startup}
								disabled={true}
							/>
						</div>
					</div>
				: 
					<Loading
						height={400}
					/>
				}
			</div>
		);
	}
}