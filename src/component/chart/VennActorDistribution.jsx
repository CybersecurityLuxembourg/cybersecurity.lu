import React from "react";
import './VennActorDistribution.css';
import * as d3 from "d3";
import * as venn from 'venn.js';


export default class VennActorDistribution extends React.Component {

	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidUpdate() {
		var sets = [ 
    		{
    			sets: ['Actors'], 
    			size: this.props.actors.length,
    			label: this.props.actors.length + " Actors"
    		}, 
    		{
            	sets: ['Startup'], 
            	size: this.props.actors.filter(a => a.is_startup).length,
            	label: this.props.actors.filter(a => a.is_startup).length + " Startups"
            },
            {
            	sets: ['Actors', 'Startup'], 
            	size: this.props.actors.filter(a => a.is_startup).length
            },
            {
            	sets: ['Has cybersecurity as a core business'], 
            	size: this.props.actors.filter(a => a.is_cybersecurity_core_business).length,
            	label: this.props.actors.filter(a => a.is_cybersecurity_core_business).length
            		+ " with cybersecurity as a core business"
            },
            {
            	sets: ['Actors', 'Has cybersecurity as a core business'], 
            	size: this.props.actors.filter(a => a.is_cybersecurity_core_business).length
            },
			{
				sets: ['Actors', 'Has cybersecurity as a core business', 'Startup'], 
				size: this.props.actors.filter(a => a.is_cybersecurity_core_business && a.is_startup).length,
				label: "" + this.props.actors.filter(a => a.is_cybersecurity_core_business && a.is_startup).length
			},
        ];

        const width = 600;
		const height = 600;

    	var div = d3.select("#venn")
		div.datum(sets).call(venn.VennDiagram().styled(false).height(height).width(width));
		div.select("svg").attr("width", 600 + 'px')
  		div.select("svg").attr("height", 600 + 'px');
		div.attr("viewBox", "0 0 600 600");

		var tooltip = d3.select("body").append("div")
		    .attr("class", "venntooltip");

		const vennDiv = document.getElementById("venn");
		const vennSvg = vennDiv.children[0];
		vennSvg.setAttribute("preserveAspectRatio", "xMaxYMin meet");
		vennSvg.setAttribute("class", "svg-content-responsive");
		vennSvg.removeAttribute("height");
		vennSvg.removeAttribute("width");
		vennSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
		vennSvg.setAttribute("preserveAspectRatio", "xMaxYMin meet");
		vennSvg.setAttribute("class", "svg-content-responsive");

		div.selectAll("g");

		d3.select(window)
			.on("resize", function() {
			    var targetWidth = div.node().getBoundingClientRect().width;
			    div.attr("width", targetWidth);
			    div.attr("height", targetWidth);
			});;
	}

    render() {
        return (
        	<div className="VennActorDistribution">
		        <div id="venn"/>
			</div>
        );
    }
}