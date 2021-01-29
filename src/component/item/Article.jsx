import React, { Component } from 'react';
import './Article.css';
import NoImage from "../box/NoImage";
import { Link } from "react-router-dom";
import { getApiURL } from "../../utils/env";


export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Link to={"/news/" + this.props.info.handle} className="Article-link">
                <div className="Article card">
                    <div class="card-date">{this.props.info.publication_date}</div>
                    {this.props.info.image !== null && this.props.info.image !== undefined ?
                        <img 
                            className="card-img-top" 
                            src={getApiURL() + "public/get_image/" + this.props.info.image} 
                            alt="Card image cap"/>
                        
                    :
                        <NoImage
                            height={200}
                        />
                    }
                    <div className="card-body">
                        <h5 className="card-title">{this.props.info.title}</h5>
                        <p className="card-text"> the card t</p>
                        <a href="#" className="btn btn-primary">Read the article !</a>
                    </div>
                </div>
            </Link>
        );
    }
}