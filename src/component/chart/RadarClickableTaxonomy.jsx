import React from "react";
import "./RadarClickableTaxonomy.css";
import { Radar } from "react-chartjs-2";
import { withRouter } from "react-router-dom";
/* import { Chart } from "chart.js"; */

class RadarClickableTaxonomy extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			chartRef: React.createRef(),
		};
	}

	render() {
		if (this.props.data === null) {
			return "";
		}

		return (
			<div
				className="RadarClickableTaxonomy"
				style={{ minHeight: this.props.minHeight === undefined ? 400 : this.props.minHeight }}>
				<Radar
					ref={this.state.chartRef}
					data={{
						labels: Object.keys(this.props.data).map((l) => l + " - " + this.props.data[l].amount),
						datasets: [{
							data: Object.values(this.props.data).map((d) => d.amount),
							borderWidth: 2,
							borderColor: "rgba(255, 255, 255, 1)",
							backgroundColor: "rgba(255, 255, 255, 0.5)",
							pointRadius: 10,
							fillColor: "white",
						}],
					}}
					options={{
						maintainAspectRatio: false,
						legend: {
							display: false,
						},
						scale: {
							gridLines: {
								color: "rgba(255, 255, 255, 0.5)",
							},
							ticks: {
								beginAtZero: true,
								fontColor: "rgba(255, 255, 255, 0.5)",
								backdropColor: "rgba(255, 255, 255, 0.0)",
								fontSize: this.props.fontSize === undefined ? 18 : this.props.fontSize,
							},
							angleLines: {
								color: "rgba(255, 255, 255, 0.5)",
							},
							pointLabels: {
								fontColor: "#ccc",
								fontSize: this.props.fontSize === undefined ? 18 : this.props.fontSize,
							},
						},
						tooltips: {
							custom: (tooltip) => {
								if (!tooltip) return;
								// eslint-disable-next-line no-param-reassign
								tooltip.displayColors = false;
							},
							callbacks: {
								title: (item, data) => data.datasets[item[0].datasetIndex].key,
								label: () => "Click for more details",
							},
						},
					}}
					onElementsClick={(elems) => {
						if (elems.length === 1) {
							// eslint-disable-next-line no-underscore-dangle
							const dataPoint = this.props.data[Object.keys(this.props.data)[elems[0]._index]];
							if ("valueId" in dataPoint) {
								this.props.history.push("/privatesector?taxonomy_values=" + dataPoint.valueId);
							}
						}
					}}
				/>
			</div>
		);
	}
}

export default withRouter(RadarClickableTaxonomy);
