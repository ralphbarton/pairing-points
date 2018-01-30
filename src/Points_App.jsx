import React, { Component } from 'react';

import {fabric}  from 'fabric';


class Points_App extends Component {

    constructor(){
	super();
	this.state = {
	    vSplit: true,
	    selectedFont: {value: 1}
	};
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
	    
	    </div>
	);
    }
}

export default Points_App;
