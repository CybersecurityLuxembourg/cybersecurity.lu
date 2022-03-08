import React from "react";
import "./BarVertical.css";
import { Bar } from "react-chartjs-2";

export default class BarVertical extends React.Component {
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
			<div
				className="BarVertical"
				style={{ minHeight: this.props.minHeight === undefined ? 550 : this.props.minHeight }}>
				<Bar
					ref={this.chartRef}
					data={{
						labels: Object.keys(this.props.data).map((l) => l + " - " + this.props.data[l]),
						datasets: [{
							data: Object.values(this.props.data),
							borderWidth: 1,
							borderColor: "#009fe3",
							backgroundColor: "#bcebff",
						}],
					}}
					options={{
						maintainAspectRatio: false,
						legend: {
							display: false,
						},
						scales: {
							xAxes: [
								{
									gridLines: {
										color: "rgba(0, 0, 0, 0)",
										display: false,
									},
									ticks: {
										beginAtZero: true,
										fontColor: "grey",
										fontSize: this.props.fontSize === undefined ? 18 : this.props.fontSize,
										maxRotation: 60,
										minRotation: 60,
									},
								},
							],
							yAxes: [
								{
									gridLines: {
										display: false,
										color: "rgba(0, 0, 0, 0)",
									},
									ticks: {
										beginAtZero: true,
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
