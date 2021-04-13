import React from "react";
import "./PageCompany.css";
import { NotificationManager as nm } from "react-notifications";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { getRequest } from "../utils/request.jsx";
import Loading from "./box/Loading.jsx";
import Company from "./item/Company.jsx";
import FormLine from "./form/FormLine.jsx";
import TreeTaxonomy from "./chart/TreeTaxonomy.jsx";

export default class PageCompany extends React.Component {
	constructor(props) {
		super(props);

		this.getCompanyContent = this.getCompanyContent.bind(this);
		this.getTaxonomy = this.getTaxonomy.bind(this);

		this.state = {
			company: null,
			taxonomy: null,
		};
	}

	componentDidMount() {
		this.getCompanyContent();
		this.getTaxonomy();
	}

	getCompanyContent() {
		getRequest.call(this, "public/get_public_company/" + this.props.match.params.id, (data) => {
			this.setState({
				company: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	getTaxonomy() {
		getRequest.call(this, "public/get_public_taxonomy", (data) => {
			this.setState({
				taxonomy: data,
			});
		}, (response) => {
			nm.warning(response.statusText);
		}, (error) => {
			nm.error(error.message);
		});
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div className={"PageCompany page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/ecosystem">COMPANY</Link></Breadcrumb.Item>
							{this.state.company !== null && !this.state.loading
								? <Breadcrumb.Item>
									<Link to={"/company/" + this.state.company.id}>{this.state.company.name}</Link>
								</Breadcrumb.Item>
								: ""}
						</Breadcrumb>
					</div>
				</div>

				<div className="row">
					<div className="col-md-12">
						<h1>Global information</h1>
					</div>
				</div>

				{this.state.company !== null
					? <div className="row row-spaced">
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
								onBlur={(v) => this.saveCompanyValue("name", v)}
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
					: <Loading
						height={400}
					/>
				}

				<div className="row">
					<div className="col-md-12">
						<h1>Taxonomy</h1>
					</div>
				</div>

				{this.state.company !== null && this.state.taxonomy !== null
					&& this.state.taxonomy.categories !== undefined
					? <div className="row row-spaced">
						{this.state.taxonomy.categories
							.filter((c) => this.state.taxonomy.category_hierarchy.map((h) => h.parent_category)
								.indexOf(c.name) < 0)
							.map((c) => (
								<div
									key={c.name}
									className="col-md-12">
									<h2>{c.name}</h2>

									<TreeTaxonomy
										companyAssignment={this.state.company.taxonomy_assignment}
										taxonomy={this.state.taxonomy}
										category={c.name}
									/>
								</div>
							))
						}
					</div>
					: <Loading
						height={400}
					/>
				}

			</div>
		);
	}
}
