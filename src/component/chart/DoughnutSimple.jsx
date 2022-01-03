import React from "react";
import "./DoughnutSimple.css";
import { Doughnut } from "react-chartjs-2";

export default class DoughnutSimple extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		if (this.props.data === null) {
			return "";
		}

		return (
			<div className="DoughnutSimple">
				<Doughnut
					ref={this.chartRef}
					data={{
						labels: [this.props.data + "%", ""],
						datasets: [{
							data: [this.props.data, 100 - this.props.data],
							borderWidth: 1,
							borderColor: ["#009fe3", "lightgrey"],
							backgroundColor: ["#bcebff", "transparent"],
						}],
					}}
					options={{
						maintainAspectRatio: true,
						legend: {
							display: false,
						},
						fillColor: "#009fe3",
						opacity: 1,
					}}
				/>
			</div>
		);
	}
}
