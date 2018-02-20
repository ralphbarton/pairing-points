import React from 'react';

import * as d3 from "d3";

import GeneratePoints from './plain-js/GeneratePoints';

class SprayOverlaySVG extends React.Component {

    constructor() {
	super();
	this.handleMouseMove = this.handleMouseMove.bind(this);
	this.handleMouseDown = this.handleMouseDown.bind(this);
	this.handleMouseUp =   this.handleMouseUp.bind(this);
	this.sprayer_frameTick = this.sprayer_frameTick.bind(this);
    }

    handleMouseMove(e){
	this.setState({
	    mouseX: e.pageX,
	    mouseY: e.pageY
	});
    }

    sprayer_frameTick(){
	const canvas_BoundingBox = this.SVGelement.getBoundingClientRect();
	const UI = this.props.state.CreatePointset;
	const mouse = this.state;
	const n_points_per_tick = UI.SprayRate * 0.1;// this value needs to be even
	
	GeneratePoints.sprayerTick(canvas_BoundingBox, mouse, UI.SprayRadius, n_points_per_tick, this.props.updateState);
    }

    handleMouseDown(e){
	this.sprayer_frameTick();//instant reponse...
	this.intervalID = setInterval(this.sprayer_frameTick, 100);
    }

    handleMouseUp(e){
	clearInterval(this.intervalID);
    }
    
    componentDidMount(){
	document.addEventListener('mousemove', this.handleMouseMove);
	document.addEventListener('mousedown', this.handleMouseDown);
	document.addEventListener('mouseup',   this.handleMouseUp);
    }

    componentWillUnmount() {
	document.removeEventListener('mousemove', this.handleMouseMove);
	document.removeEventListener('mousedown', this.handleMouseDown);
	document.removeEventListener('mouseup',   this.handleMouseUp);
    }
    
    componentDidUpdate(){

	const BB = this.SVGelement.getBoundingClientRect();
	const x = this.state.mouseX - BB.left;
	const y = this.state.mouseY - BB.top;
	
	d3.select(this.SVGelement).select("circle").attr("cx", x).attr("cy", y);
	
    }
    
    render() {

	//width is always the number of pixels representing 20 units on the numberline
	const radiusPixels = this.props.state.CreatePointset.SprayRadius * this.props.width / 20;
	
	return (
	    <div className="SprayOverlaySVG">

	      <svg
		 width={this.props.width}
		 height={this.props.height}
		 ref={ el => {this.SVGelement = el;}}
		onMouseDown={(event) => { if(event.preventDefault) {event.preventDefault();}}}
		>
		<circle cx="-100" cy="-100" r={radiusPixels} />
	      </svg>
	    </div>
	);
    }
}

export default SprayOverlaySVG;
