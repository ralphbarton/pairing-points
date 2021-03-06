import React from 'react';

import PlaneAxesSVG from './PlaneAxesSVG';
import SprayOverlaySVG from './SprayOverlaySVG';

import XYplane_FabricCanvas from './plain-js/XYplane_FabricCanvas';
import XYplane_flashPurpleDistributionShape from './plain-js/XYplane_flashPurpleDistributionShape';
import FabricCanvasHandlers from './plain-js/FabricCanvasHandlers';

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

    regenFabricCanvas(){
	const points = this.props.state.CreatePointset.points;

	// this remakes the DOM element into a fabric canvas
	this.canvas = XYplane_FabricCanvas.regenerate(this.plainCanvasElement, this.canvas, this.state.size, points);

	// this re-adds the handler functions for Fabric defined events (selections etc.)
	// It's at this level rather than being part of the parent function call to avoid an excessive list of passed params
	FabricCanvasHandlers.AddAll(this.canvas, this.props.state, this.props.updateState);

    }

    addNewPoints(nDiscard){
	const sliceIndex = Math.max(0, nDiscard-1); 
	const newPoints = this.props.state.CreatePointset.points.slice(sliceIndex);

	//mutates the fabric canvas passed (1st param)
	XYplane_FabricCanvas.addPoints(this.canvas, this.state.size, newPoints);
    }
    

    componentDidMount(){
	this.regenFabricCanvas();
	this.calcCanvasDimentions(true);//this function call is to set aspect ratio in parent

	window.addEventListener("resize", ()=>{
	    this.setState({
		size: this.calcCanvasDimentions(true)
	    });
	});

	XYplane_flashPurpleDistributionShape.loadGaussianSVGasFabricElement(this.gaussianSVGelement);
	
    }


    
    componentDidUpdate(prevProps, prevState){
	const newWidth =  prevState.size.width  !== this.state.size.width;
	const newHeight = prevState.size.height !== this.state.size.height;

	// 1. Size change. Respond by regenerating canvas
	if( newWidth || newHeight ){
	    this.regenFabricCanvas();
	    return;
	}

	// 2. Selection of a distribution. Flash it on-screen.
	if(this.props.state.CreatePointset.dist_nChg !== prevProps.state.CreatePointset.dist_nChg){
	    const distVal = this.props.state.CreatePointset.dist.value;
	    XYplane_flashPurpleDistributionShape.flash(distVal, this.canvas, this.state.size);
	}

	// 3. The underlying pointset has changed. Regenerate the canvas (maybe optimise this later)
	const pointsChange =   this.props.state.CreatePointset.points !== prevProps.state.CreatePointset.points;
	const doPointsRedraw = this.props.state.CreatePointset.points_nRedraw !== prevProps.state.CreatePointset.points_nRedraw;
	if( pointsChange ){
//	    console.log("pointsChange", this.props.state.CreatePointset.points.length, prevProps.state.CreatePointset.points.length);
	    if( doPointsRedraw ){
//		console.log("full redraw");
		this.regenFabricCanvas();
	    }else{
//		console.log("efficient redraw");
		const nDiscard = prevProps.state.CreatePointset.points.length;
		this.addNewPoints(nDiscard);
	    }
	}
	
    }

    componentWillUnmount(){
	const canvas = this.canvas;
	canvas.dispose();
    }

    
    onAnimationFrame(time) {
	XYplane_FabricCanvas.handleAnimationFrame(this.canvas, time, this.props.endAnimation);
    }
    
    calcCanvasDimentions(doSetParent_ratioHW){
	const W = window.innerWidth;
	const H = window.innerHeight;
	const LeftCol_W = 250;
	const M = 20;

	const width = W - 3*M - LeftCol_W;
	const height = H - 2*M;

	if(doSetParent_ratioHW){
	    this.props.updateState({CreatePointset: {ratioHW: {$set: (height/width)}}});
	}
	
	return {width, height};
    }
    
    
    render() {

	const canvasDimentions = this.calcCanvasDimentions();
	const axesClass = this.props.state.DisplaySettings.axes ? "visible" : "";
	
	return (
	    <div className="XYplane">

	      {XYplane_flashPurpleDistributionShape.gaussianSVG(canvasDimentions, el => {this.gaussianSVGelement = el;})}
	      
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
