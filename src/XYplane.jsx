import React from 'react';

import {fabric}  from 'fabric';

import PlaneAxesSVG from './PlaneAxesSVG';
import SprayOverlaySVG from './SprayOverlaySVG';

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

    componentDidUpdate(prevProps, prevState){
	const newWidth =  prevState.size.width  !== this.state.size.width;
	const newHeight = prevState.size.height !== this.state.size.height;

	// respond to a change in canvas dimentions (by regenerating)
	if( newWidth || newHeight ){
	    this.regenerateFabricCanvas();
	    return;
	}

	// respond to a change in the selected distribution for points generation
	// (n.b. unlike above this is parent-component state)
	const canvas = this.canvas;

	const distVal = this.props.state.CreatePointset.dist ? this.props.state.CreatePointset.dist.value : null;
	const prevDist = prevProps.state.CreatePointset.dist;
	const distChange = !prevDist || prevDist.value !== distVal;

	if(distChange){

	    const cx = this.state.size.width  / 2;
	    const cy = this.state.size.height / 2;
	    const unit = cx/10;
	    /*
	     distVal:
	     0 - 'Uniform (small circle)'
	     1 - 'Uniform (large circle)'
	     2 - 'Uniform (square)'
	     3 - 'Uniform (visible space)'
	     4 - '2D Gaussian (truncated)'
	     */
	    const demoShape = (()=>{
		if(distVal === 0 || distVal === 1){
		    return new fabric.Circle({
			// small radius 4, large radius 8
			radius: unit*4*(distVal+1), fill: 'rgba(148, 20, 244, 0.5)', opacity: 0,
			stroke: 'rgba(148, 20, 244, 1)', strokeWidth: 3,
			left: cx, top: cy, originX: 'center', originY: 'center'
		    });
		}
		if(distVal === 2){
		    return new fabric.Rect({
			width: 8*unit, height: 8*unit, fill: 'rgba(148, 20, 244, 0.5)', opacity: 0,
			stroke: 'rgba(148, 20, 244, 1)', strokeWidth: 3,
			left: cx, top: cy, originX: 'center', originY: 'center'
		    });
		}
		if(distVal === 3){
		    return new fabric.Rect({
			width: 2*cx, height: 2*cy, fill: 'rgba(148, 20, 244, 0.5)', opacity: 0,
			left: 0, top: 0
		    });
		}
		return null;
	    })();


	    if(demoShape){
		// add the new shape...
		canvas.add(demoShape);
		demoShape.animate(
		    {opacity: 0.5}, {duration: 200}
		);
		
		// clear it after a delay (the reference to the created shape is still in-scope, here!
		setTimeout(()=>{
		    demoShape.animate(
			{opacity: 0},
			{
			    duration: 200,
			    onComplete: ()=>{canvas.remove(demoShape);}
			}
		    );
		    
		}, 600);
	    }
	}
	
    }

    componentWillUnmount(){
	const canvas = this.canvas;
	canvas.dispose();

    }

    onAnimationFrame(time) {
	const canvas = this.canvas;
	
	//	const progress = Math.round(time / this.durationMs * 10000)/100;
	//	const progress2 = progress % 100; //Mod100
	//	this.bar.style.width = `${progress2}%`;

	const oldTop = canvas._objects[0].top;
	if(oldTop>400){this.incr = -1;}
	if(oldTop<30) {this.incr = +1;}

	
	canvas._objects[0].setTop(oldTop + this.incr);
	canvas._objects[0].setRadius(oldTop/3);
	canvas.renderAll();
	
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
	const axesClass = this.props.state.DisplaySettings.axes ? "visible" : "";
	
	return (
	    <div className="XYplane">

	      <PlaneAxesSVG {...canvasDimentions} className={axesClass}/>
	      
	      <div>
		<canvas
		   width={canvasDimentions.width}
		   height={canvasDimentions.height}
		   ref={ el => {this.plainCanvasElement = el;}}
		  />
	      </div>

	      { this.props.state.CreatePointset.SprayOverlay &&
		  <SprayOverlaySVG
			 state={this.props.state}
			 updateState={this.props.updateState}
			 {...canvasDimentions}
			 />
	      }
	      
	    </div>
	);
    }
}

export default ReactAnimationFrame(XYplane);
