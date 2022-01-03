import React from "react";
import "./BarValueChainDistribution.css";
import { HorizontalBar } from "react-chartjs-2";

export default class BarValueChainDistribution extends React.Component {
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
			<div className="BarValueChainDistribution">
				<HorizontalBar
					ref={this.chartRef}
					data={{
						labels: Object.keys(this.props.data).map((l) => l + " - " + this.props.data[l]),
						datasets: [{
							data: Object.values(this.props.data),
							borderWidth: 1,
							borderColor: "white",
							backgroundColor: "white",
						}],
					}}
					options={{
						legend: {
							display: false,
						},
						scales: {
							yAxes: [
								{
									gridLines: {
										color: "rgba(0, 0, 0, 0)",
										display: false,
									},
									ticks: {
										beginAtZero: true,
										fontColor: "#CCC",
										fontSize: 18,
									},
								},
							],
							xAxes: [
								{
									gridLines: {
										display: false,
										color: "rgba(0, 0, 0, 0)",
									},
									ticks: {
										display: false,
									},
								},
							],
						},
						fillColor: "#F5DEB3",
						opacity: 1,
					}}
				/>
			</div>
		);
	}
}
