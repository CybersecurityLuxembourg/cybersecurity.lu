import React from 'react';
import './PageNews.css';
import Lock from "./box/Lock";
import Loading from "./box/Loading";
import {getRequest} from '../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import JobOffer from './item/JobOffer';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import Message from "./box/Message";
import { dictToURI } from "../utils/url";
import ArticleSearch from './form/ArticleSearch';
import SimpleTable from './table/SimpleTable';


export default class PageJobs extends React.Component {

	constructor(props){
		super(props);

		this.getArticles = this.getArticles.bind(this);
		this.modifyFilters = this.modifyFilters.bind(this);

		this.state = {
			page: 1,
			articles: null,
			loading: false,
			filters: {
				"media": "CYBERLUX",
				"type": "JOB OFFER",
				"taxonomy_values": [],
				"title": null
			}
		}
	}

	componentDidMount() {
		this.getArticles()
	}

	getArticles() {
		this.setState({
			loading: true
		});

		let params = dictToURI(this.state.filters)

		getRequest.call(this, "public/get_public_articles?" + params, data => {
			this.setState({
				articles: data,
				loading: false
			});
		}, response => {
			this.setState({ loading: false });
			nm.warning(response.statusText);
		}, error => {
			this.setState({ loading: false });
			nm.error(error.message);
		});
	}

	modifyFilters(field, value) {
		let filters = {...this.state.filters};
		filters[field] = value
		this.setState({ filters: filters });
	}

	changeState(field, value) {
		this.setState({[field]: value});
	}

	render() {
		return (
			<div className={"page max-sized-page"}>
				<div className="row">
					<div className="col-md-12">
						<Breadcrumb>
							<Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to="/jobs">JOBS</Link></Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>

				<ArticleSearch
					filters={this.state.filters}
					onChange={this.modifyFilters}
					onSearch={this.getArticles}
				/>

				<div className="row">
					<div className="col-md-12">
						<h1>Job offers</h1>
					</div>
				</div>

				{this.state.articles !== null && !this.state.loading ? 
					(this.state.articles.length === 0 ?
						<div className="row row-spaced">
							<div className="col-md-12">
								<Message
									text={"No job offer found"}
									height={200}
								/>
							</div>
						</div>
					: 
						<SimpleTable
							className={""}
							elements={this.state.articles.map((a, i) => {
								return [a, i]
							})}
							buildElement={(a, i) => {
								return (
									<div className="col-md-12">
										<JobOffer
											info={a}
										/>
									</div>
								)
							}} 
						/>
					)
				: 
					<div className="row row-spaced">
						<div className="col-md-12">
							<Loading
								height={200}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}