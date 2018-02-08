import React from 'react';

import {fabric}  from 'fabric';
const ReactAnimationFrame = require('react-animation-frame');

class XYplane extends React.Component {

    constructor(){
	super();

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

//	const progress = Math.round(time / this.durationMs * 10000)/100;
//	const progress2 = progress % 100; //Mod100
//	this.bar.style.width = `${progress2}%`;

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

	const W = window.innerWidth;
	const H = window.innerHeight;
	const LeftCol_W = 250;
	const M = 20;

	const canv_W = W - 3*M - LeftCol_W;
	const canv_H = H - 2*M;
	
	return (
	    <div className="XYplane">

	      <div>
		<canvas
		   width={canv_W}
		   height={canv_H}
		   ref={ el => {this.fabricCanvasElement = el;}}
		  />
	      </div>

	      {/*
	      <div className="timer__bar" ref={node => this.bar = node}></div>
	      */}

	    </div>
	);
    }
}

export default ReactAnimationFrame(XYplane);
