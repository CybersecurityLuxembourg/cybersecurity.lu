import React, { Component } from 'react';
import './Company.css';
import NoImage from "../box/NoImage";
import { Link } from "react-router-dom";
import { getApiURL } from "../../utils/env";


export default class Company extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Link to={"/company/" + this.props.info.id} className="Company-link">
                <div class="Company card">
                    <div class="card-horizontal">
                        <div class="img-square-wrapper">
                            {this.props.info.image !== null && this.props.info.image !== undefined ?
                                <img 
                                    className="card-img-top" 
                                    src={getApiURL() + "public/get_image/" + this.props.info.image} 
                                    alt="Card image cap"/>
                                
                            :
                                <NoImage/>
                            }
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{this.props.info.name}</h5>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}