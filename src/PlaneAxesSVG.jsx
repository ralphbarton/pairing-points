import React from 'react';

import * as d3 from "d3";

class PlaneAxesSVG extends React.Component {


    componentDidMount(){
	this.d3DrawAxes();
    }

    componentDidUpdate(){
	//values must be 'stab;e' for 0.2s before it calls the d3 redraw code
	clearTimeout(this.timoutID);
	this.timoutID = setTimeout(()=>{
	    this.d3DrawAxes();
	}, 200);
    }

    
    d3DrawAxes(){
	
	d3.select(this.SVGelement).selectAll("*").remove();

	const myTickValues =  [-10, -5, 5, 10];
	
	// associates numbers to pixels
	var x = d3.scaleLinear()
		.domain([-10, 10])
		.range([0, this.props.width]);//pixels

	// create the axes object
	var xAxis = d3.axisBottom(x)
		.tickSize(13)
		.tickValues(myTickValues)
		.tickFormat(d3.format(".1f"));

	// add to svg (in a <g>) and reposition
	var gX = d3.select(this.SVGelement).append("g");
	gX.attr("transform", `translate(0, ${this.props.height/2})`)
	    .call(xAxis);
	

	// associates numbers to pixels
	const relH = this.props.height / this.props.width;

	var y = d3.scaleLinear()
		.domain([10*relH, -10*relH])
		.range([0, this.props.height]);//pixels

	// create the axes object
	var yAxis = d3.axisLeft(y)
		.tickSize(13)
		.tickValues(myTickValues)
		.tickFormat(d3.format(".1f"));

	// add to svg (in a <g>) and reposition
	var gY = d3.select(this.SVGelement).append("g");
	gY.attr("transform", `translate(${this.props.width/2}, 0)`)
	    .call(yAxis);

    }
    
    render() {
	
	return (
	    <div className={"PlaneAxesSVG " + (this.props.className)}>

	      <svg
		 width={this.props.width}
		 height={this.props.height}
		 ref={ el => {this.SVGelement = el;}}
		/>
	    </div>
	);
    }
}

export default PlaneAxesSVG;
