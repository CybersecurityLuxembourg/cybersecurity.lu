import React from "react";
import "./InsideApp.css";
import GovBar from "./bar/GovBar";
import Menu from "./bar/Menu";
import Footer from "./bar/Footer";
import PageHome from "./PageHome";
import PageNews from "./PageNews";
import PageAbout from "./PageAbout";
import PageEcosystem from "./PageEcosystem";
import PageJobs from "./PageJobs";
import PageJob from "./PageJob";
import PageCalendar from "./PageCalendar";
import PageArticle from "./PageArticle";
import PageCompany from "./PageCompany";
import PageEvent from "./PageEvent";
import PageMap from "./PageMap";
import PageLogin from "./PageLogin";
import { Route, Switch } from "react-router-dom";
import Particles from 'react-particles-js';


export default class InsideApp extends React.Component {

    constructor(props) {
        super(props);

        this.changeState = this.changeState.bind(this);

        this.state = {
        }
    }

    changeState(field, value) {
        this.setState({[field]: value});
    }

    render() {
        return (
            <div id="InsideApp">
                <GovBar/>
                <Menu/>
                <div id="InsideApp-content">
                    <Particles 
                        params={{
                            "particles": {
                                "number": {
                                    "value": 50
                                },
                                "size": {
                                    "value": 4
                                },
                                "color": {
                                    "value": ["#009fe3", "#e40613"]
                                },
                                "shape": {
                                  "type": "images",
                                  "stroke": {
                                    "width": 0,
                                    "color": "black"
                                  },
                                  "images": [
                                    {
                                      "src": "/favicon.ico",
                                      "width": 1000,
                                      "height": 1000
                                    },
                                  ]
                                },
                                "move": {
                                  "enable": true,
                                  "speed": 0.2,
                                },
                                "opacity": {
                                    value: 0.1,
                                    anim: {
                                        enable: false
                                    }
                                },
                                "line_linked": {
                                  "enable": true,
                                  "distance": 150,
                                  "color": {
                                    "value": "#000000"
                                  },
                                  "opacity": 0.1,
                                  "width": 1
                                },
                            },
                        }}
                    />
                    <Switch>
                        <Route path="/news/:handle" render={(props) => <PageArticle {...props} />}/>
                        <Route path="/company/:id" render={(props) => <PageCompany {...props} />}/>
                        <Route path="/calendar/:handle" render={(props) => <PageEvent {...props} />}/>
                        <Route path="/jobs/:id" render={(props) => <PageJob {...props} />}/>

                        <Route path="/news" render={(props) => <PageNews {...props} />}/>
                        <Route path="/ecosystem" render={(props) => <PageEcosystem {...props} />}/>
                        <Route path="/calendar" render={(props) => <PageCalendar {...props} />}/>
                        <Route path="/ecosystem" render={(props) => <PageEcosystem {...props} />}/>
                        <Route path="/jobs" render={(props) => <PageJobs {...props} />}/>
                        <Route path="/about" render={(props) => <PageAbout {...props} />}/>
                        <Route path="/login" render={(props) => <PageLogin {...props} />}/>

                        <Route path="/map" render={(props) => <PageMap {...props} />}/>

                        <Route path="/" render={(props) => <PageHome {...props} />}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}