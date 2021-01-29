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

    getCompanyContent(){
        getRequest.call(this, "public/get_related_articles/" + this.props.match.params.handle, data => {
            this.setState({
                relatedArticles: data,
                relatedArticleLoading: false
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
                            <Breadcrumb.Item><Link to="/ecosystem">ECOSYSTEM</Link></Breadcrumb.Item>
                            {this.state.article !== null && !this.state.loading ?
                            <Breadcrumb.Item><Link to={"/company/" + this.state.article.handle}>{this.state.article.title}</Link></Breadcrumb.Item>
                                : ""}
                        </Breadcrumb>
                    </div>
                </div>

                {this.state.article !== null && this.state.article.content !== undefined && !this.state.articleLoading ? 
                    <div>
                    </div>
                : 
                    <Loading
                        height={200}
                    />
                }
			</div>
		);
	}
}