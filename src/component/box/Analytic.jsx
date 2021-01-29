import React from 'react';
import './Analytic.css'

export default class Analytic extends React.Component {

    render() {
        return (
            <div className="Analytic">
                <div className="Analytic-value">
                    {this.props.value}
                </div>
                <div className="Analytic-desc">
                	{this.props.desc}
                </div>
            </div>
        )
    }
}