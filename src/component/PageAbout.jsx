import React from 'react';
import './PageAbout.css';
import Lock from "./box/Lock";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";


export default class PageAbout extends React.Component {

	constructor(props){
		super(props);


		this.state = {
		}
	}

	render() {
		return(
			<div className={"page max-sized-page"}>
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">SECURITYMADEIN.LU</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to="/about">About</Link></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Lock
                            height={150}
                        />
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                        <h1>Our expertise</h1>
                    </div>
                    <div className="col-md-2">
                        <Lock
                            height={200}
                        />
                    </div>
                    <div className="col-md-2">
                        <Lock
                            height={200}
                        />
                    </div>
                    <div className="col-md-2">
                        <Lock
                            height={200}
                        />
                    </div>
                    <div className="col-md-2">
                        <Lock
                            height={200}
                        />
                    </div>
                </div>

                <div className="row row-spaced justify-content-md-center PageAbout-our-teams">
                    <div className="col-md-12">
                        <h1>Our teams</h1>
                    </div>
                    <div className="col-md-3">
                        <h2>CIRCL</h2>
                        <div className={"centered"}>
                            <a 
                                href="https://www.circl.lu/" 
                                target="_blank" 
                                title="About" 
                                class="text-capitalize">
                                <img
                                    src="img/circl-logo.png"
                                />
                            </a>
                        </div>
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <a 
                            href="https://www.circl.lu/" 
                            target="_blank" 
                            title="About" 
                            class="text-capitalize">
                            Visit website
                        </a>
                    </div>
                    <div className="col-md-3">
                        <h2>CASES</h2>
                        <div className={"centered"}>
                            <a 
                                href="https://www.cases.lu/" 
                                target="_blank" 
                                title="About" 
                                class="text-capitalize">
                                <img
                                    src="img/cases-logo.png"
                                />
                            </a>
                        </div>
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <a 
                            href="https://www.cases.lu/" 
                            target="_blank" 
                            title="About" 
                            class="text-capitalize">
                            Visit website
                        </a>
                    </div>
                    <div className="col-md-3">
                        <h2>C3</h2>
                        <div className={"centered"}>
                            <a 
                                href="https://www.c-3.lu/" 
                                target="_blank" 
                                title="About" 
                                class="text-capitalize">
                                <img
                                    src="img/c3-logo.png"
                                />
                            </a>
                        </div>
                        <div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <a 
                            className="right-button"
                            href="https://www.c-3.lu/" 
                            target="_blank" 
                            title="About" 
                            class="text-capitalize">
                            Visit website
                        </a>
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                        <h1>Our history</h1>
                    </div>
                    <div className="col-md-12">
                        <p><b>SECURITYMADEIN.LU</b> was born from the need to preserve and enhance, within a permanent structure, the results obtained through many years of work in the field of informations security activity of: CASES and CIRCL and the results of all Luxembourg activities supported by the European program ‘Safer Internet’ (now known under the name BEE SECURE). Its activities and goals build on the „Information and Communication Systems Security Strategy“ defined by the Ministry of the Economy in 2003 and is continuously adjusted in coherence with the national</p>
                    </div>
                    <div className="col-md-12">
                        <ul>
                            <li>May 5th 2010, SECURITYMADEIN.LU was created, see the <a href="http://www.etat.lu/memorial/memorial/2010/C/Pdf/c1448157.pdf#Page=10">articles of association</a> for full details.</li>
                            <li>July 2012 a few minor adjustments were published, details in the <a href="http://www.etat.lu/memorial/2012/C/Pdf/c2057208.pdf#Page=38">extract of the „mémorial C“</a>.</li>
                            <li>March 2016 a few minor adjustments were published, details in the <a href="http://www.etat.lu/memorial/2016/C/Pdf/c1583016.pdf#Page=13">extract of the „mémorial C“</a></li>
                            <li>further adjustments can be found via the <a href="https://www.lbr.lu">Luxembourg Business Registers online service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row justify-content-md-center">
                    <div className="col-md-12">
                        <h1>Contact</h1>
                    </div>
                    <div className="col-md-12">
                        <Lock
                            height={200}
                        />
                    </div>
                </div>
            
			</div>
		);
	}
}