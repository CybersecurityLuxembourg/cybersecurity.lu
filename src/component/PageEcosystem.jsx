import React from 'react';
import './PageEcosystem.css';
import Lock from "./box/Lock";
import Analytic from "./box/Analytic";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import {getRequest} from '../utils/request';
import {NotificationManager as nm} from 'react-notifications';
import Loading from "./box/Loading";
import Company from "./item/Company";
import SimpleTable from "./table/SimpleTable";
import CompanySearch from "./form/CompanySearch";
import GlobalMap from "./map/GlobalMap";


export default class PageEcosystem extends React.Component {

	constructor(props){
		super(props);

        this.getActors = this.getActors.bind(this);

		this.state = {
            actors: null,
            filters: {}
		}
	}

    componentDidMount() {
        this.getActors();
    }

    getActors() {
        getRequest.call(this, "public/get_public_actors", data => {
            this.setState({
                actors: data,
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

	render() {
		return(
			<div className={"PageEcosystem page max-sized-page"}>
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">CYBERSECURITY LUXEMBOURG</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/competence">ECOSYSTEM</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <CompanySearch
                    filters={this.state.filters}
                    onChange={this.modifyFilters}
                    onSearch={this.getArticles}
                />

                <div className="row">
                    <div className="col-md-12">
                        <h1>Companies</h1>
                    </div>
                </div>

                {this.state.actors !== null ?
                    <SimpleTable
                        numberDisplayed={6}
                        elements={this.state.actors.map((a, i) => {
                            return [a, i]
                        })}
                        buildElement={(a, i) => {
                            return (
                                <div className="col-md-6">
                                    <Company
                                        info={a}
                                    />
                                </div>
                            )
                        }} 
                    />
                :
                    <div className="row">
                        <div className="col-md-12">
                            <Loading
                                height={400}
                            />
                        </div>
                    </div>
                }
                
                <div className="row row-spaced">
                    <div className="col-md-12">
                        <h1>Dashboard</h1>
                    </div>
                    <div className="col-md-12">
                        {this.state.actors !== null ?
                            <div className="row">
                                <div className="col-md-4">
                                    <Analytic
                                        value={this.state.actors.length}
                                        desc={"Total actors"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Analytic
                                        value={this.state.actors.filter(a => a.is_cybersecurity_core_business).length}
                                        desc={"With CS as a core business"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Analytic
                                        value={this.state.actors.filter(a => a.is_startup).length}
                                        desc={"Startups"}
                                    />
                                </div>
                            </div>
                        :
                            <Loading
                                height={400}
                            />
                        }
                    </div>
                </div>

                <div className="row row-spaced">
                    <div className="col-md-12">
                        <h1>Map</h1>
                    </div>
                    <div className="col-md-12">
                        {this.state.actors !== null ?
                            <GlobalMap />
                        :
                            <Loading
                                height={400}
                            />
                        }
                    </div>
                    <div className="col-md-12">
                        {this.state.actors !== null ?
                            <div className={"right-buttons"}>
                            <button
                                className={"blue-background"}
                                onClick={() => this.props.history.push("/map")}
                            >
                                <i class="fas fa-arrow-alt-circle-right"/> View the map on full page
                            </button>
                        </div>
                        :
                            ""
                        }
                    </div>
                </div>
			</div>
		);
	}
}