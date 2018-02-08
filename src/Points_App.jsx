import React, { Component } from 'react';

import {fabric}  from 'fabric';

import update from 'immutability-helper';


import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ReactAnimationFrame = require('react-animation-frame');



var _ = require('lodash');

class Points_App extends Component {

    constructor(){
	super();
	this.state = {
	    Pointset: {
		n: 10,
		dist: null,
		points: []
	    }
	};

	this.durationMs = 4000;
	this.incr = 1;
    }

    componentDidMount(){

	const canvas = new fabric.Canvas(this.fabricCanvasElement);
	this.canvas = canvas;

	//for debug interaction in console:
	window.canvas = canvas;

	
	var circle = new fabric.Circle({
	    radius: 100, fill: '#F90', left: 100, top: 130
	});
	var triangle = new fabric.Triangle({
	    width: 160, height: 220, angle: 30, fill: '#29A', left: 350, top: 20
	});

	canvas.add(circle, triangle);

    }

    componentWillUnmount(){
	const canvas = this.canvas;
	canvas.dispose();

    }

    onAnimationFrame(time) {

	const progress = Math.round(time / this.durationMs * 10000)/100;
	const progress2 = progress % 100; //Mod100
	this.bar.style.width = `${progress2}%`;

	const oldLeft = this.canvas._objects[0].left;
	if(oldLeft>300){this.incr = -1;}
	if(oldLeft<30) {this.incr = +1;}

	
	this.canvas._objects[0].setLeft(oldLeft + this.incr);
	this.canvas._objects[0].setRadius(oldLeft);
	this.canvas.renderAll();
	
	/*
	 if (progress >= 200) {
	 this.props.endAnimation();
	 }
	 */
    }
    
    render() {

	return (
	    <div className="Points_App">

	      {/* 1. Heading Area */}
	      <div className="title">
		The points app
		<div>built in React</div>
	      </div>

	      <div>
		<canvas
		   width="800"
		   height="600"
		   ref={ el => {this.fabricCanvasElement = el;}}
		  />
	      </div>

	      <div className="timer__bar" ref={node => this.bar = node}></div>
	    
	    </div>
	);
    }
}

export default ReactAnimationFrame(Points_App);
