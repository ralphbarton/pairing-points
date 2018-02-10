import React from 'react';

import {fabric}  from 'fabric';

import PlaneAxesSVG from './PlaneAxesSVG';

const ReactAnimationFrame = require('react-animation-frame');

class XYplane extends React.Component {

    constructor(){
	super();

	this.durationMs = 4000;
	this.incr = 1;

	this.state = {
	    size: this.calcCanvasDimentions()
	};
    }
    

    componentDidMount(){
	this.regenerateFabricCanvas();
	window.addEventListener("resize", ()=>{

	    this.setState({
		size: this.calcCanvasDimentions()
	    });

	});
	
    }

    componentDidUpdate(){
	this.regenerateFabricCanvas();
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

    
    regenerateFabricCanvas(){
	if(this.canvas){
	    this.canvas.dispose();
	}

	const canvas = new fabric.Canvas(this.plainCanvasElement);
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

    
    calcCanvasDimentions(){
	const W = window.innerWidth;
	const H = window.innerHeight;
	const LeftCol_W = 250;
	const M = 20;

	const width = W - 3*M - LeftCol_W;
	const height = H - 2*M;

	return {width, height};
    }
    
    
    render() {

	const canvasDimentions = this.calcCanvasDimentions();
	
	return (
	    <div className="XYplane">

	      <PlaneAxesSVG {...canvasDimentions}/>
	      
	      <div>
		<canvas
		   width={canvasDimentions.width}
		   height={canvasDimentions.height}
		   ref={ el => {this.plainCanvasElement = el;}}
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
