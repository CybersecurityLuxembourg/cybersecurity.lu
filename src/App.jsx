import React from "react";
import "./App.css";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import InsideApp from "./component/InsideApp";
import { BrowserRouter } from "react-router-dom";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <div id="App">
                <BrowserRouter>
                    <InsideApp/>
                    <NotificationContainer/>
                </BrowserRouter>
            </div>
        );
    }
}