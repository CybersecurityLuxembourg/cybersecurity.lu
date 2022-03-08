import React from "react";
import "./VennActorDistribution.css";
import * as d3 from "d3";
import * as venn from "venn.js";

export default class VennActorDistribution extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	componentDidMount() {
		const sets = this.getData();

		const div = d3.select("#venn");

		let targetWidth = div.node().getBoundingClientRect().width;
		targetWidth = targetWidth < 600 ? 600 : targetWidth;

		div.datum(sets).call(venn.VennDiagram().styled(false).height(targetWidth).width(targetWidth));

		const vennDiv = document.getElementById("venn");
		const vennSvg = vennDiv.children[0];

		vennDiv.setAttribute("class", "svg-container oneten-height");
		vennSvg.removeAttribute("height");
		vennSvg.removeAttribute("width");
		vennSvg.setAttribute("viewBox", "0 0 " + targetWidth + " " + targetWidth);
		vennSvg.setAttribute("preserveAspectRatio", "xMaxYMin meet");

		div.selectAll("g");

		d3.select(window)
			.on("resize", () => {
				let changedTargetWidth = div.node().getBoundingClientRect().width;
				changedTargetWidth = changedTargetWidth < 600 ? 600 : changedTargetWidth;
				vennSvg.setAttribute("viewBox", "0 0 " + changedTargetWidth + " " + changedTargetWidth);
			});
	}

	componentDidUpdate(prevProps) {
		if (JSON.stringify(this.props.actors) !== JSON.stringify(prevProps.actors)) {
			const div = d3.select("#venn");
			div.datum(this.getData());
		}
	}

	getData() {
		const onlyStartup = this.props.actors.length === this.props.actors
			.filter((a) => a.is_startup).length;
		const onlyCore = this.props.actors.length === this.props.actors
			.filter((a) => a.is_cybersecurity_core_business).length;

		const data = [
			{
				sets: ["Actors"],
				size: this.props.actors.length,
				label: this.props.actors.length
					+ (onlyStartup ? " Startups" : " Actors")
					+ (onlyCore ? " with cybersecurity as a core business" : ""),
			},
		];

		if (!onlyStartup) {
			data.push({
				sets: ["Startup"],
				size: this.props.actors.filter((a) => a.is_startup).length,
				label: this.props.actors.filter((a) => a.is_startup).length + " Startups",
			});
			data.push({
				sets: ["Actors", "Startup"],
				size: this.props.actors.filter((a) => a.is_startup).length,
			});
		}

		if (!onlyCore) {
			data.push({
				sets: ["Has cybersecurity as a core business"],
				size: this.props.actors.filter((a) => a.is_cybersecurity_core_business).length,
				label: this.props.actors.filter((a) => a.is_cybersecurity_core_business).length
					+ " with cybersecurity as a core business",
			});
			data.push({
				sets: ["Actors", "Has cybersecurity as a core business"],
				size: this.props.actors.filter((a) => a.is_cybersecurity_core_business).length,
			});
		}

		if (!onlyStartup && !onlyCore) {
			data.push({
				sets: ["Actors", "Has cybersecurity as a core business", "Startup"],
				size: this.props.actors
					.filter((a) => a.is_cybersecurity_core_business && a.is_startup).length,
				label: "" + this.props.actors
					.filter((a) => a.is_cybersecurity_core_business && a.is_startup).length,
			});
		}

		return data;
	}

	// eslint-disable-next-line class-methods-use-this
	render() {
		return (
			<div className="VennActorDistribution">
				<div className="VennActorDistribution-wrapped">
					<div id="venn"/>
				</div>
			</div>
		);
	}
}
