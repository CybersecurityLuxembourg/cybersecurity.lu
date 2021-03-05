import React, { Component } from 'react';
import './Chip.css';
import CheckBox from './CheckBox';


export default class Chip extends Component {

		constructor(props) {
				super(props);

				this.state = {
				}
		}

		render() {
				return (
						<div class="Chip">
							<div class="Chip-head">{this.props.label[0]}</div>
							<div class="Chip-content">{this.props.label}</div>
							{this.props.onClick !== undefined ?
									<div class="Chip-close">
										<i 
											class="fas fa-times"
											onClick={() => this.props.onClick(this.props.value)}
										/>
								</div>
							: ""}
						</div>
				);
		}
}