import React from 'react';
import './PageLogin.css';
import Lock from "./box/Lock";


export default class PageLogin extends React.Component {

	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidMount() {
	}

	changeState(field, value) {
        this.setState({[field]: value});
    }

	render() {
        let positionToTreat = 0;

		return(
			<div className={"PageLogin page max-sized-page"}>
                <Lock
                    height={600}
                />
			</div>
		);
	}
}