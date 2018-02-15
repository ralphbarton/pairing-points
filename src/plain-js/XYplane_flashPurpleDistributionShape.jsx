import React from 'react';
import {fabric}  from 'fabric';

const XYplane_flashPurpleDistributionShape = {

    gaussianSVG(canvasDimentions, refCallback){
	const W = canvasDimentions.width;
	return(
	    <svg className="gaussianSVG" width={W} height={W} viewBox="0 0 99 99" ref={refCallback}>
	      <path
		 d="M13.8,86.8c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5c19.1,0,23.9-21.3,27.4-36.9c2.2-9.6,3.9-17.3,8.3-17.4c0,0,0,0,0,0   c0.3,0,0.5,0.2,0.5,0.5c0,0.3-0.2,0.5-0.5,0.5c-3.6,0.1-5.4,7.8-7.3,16.6C38.6,65,33.7,86.8,13.8,86.8z"
		 stroke="rgba(148, 20, 244, 1)"
		 strokeWidth="3.5"
		 />
	      <path
		 d="M85.2,86.8c-19.9,0-24.8-21.8-28.4-37.7c-2-8.9-3.7-16.5-7.3-16.6c-0.3,0-0.5-0.2-0.5-0.5c0-0.3,0.2-0.5,0.5-0.5   c4.4,0.1,6.1,7.8,8.3,17.4c3.5,15.6,8.3,36.9,27.4,36.9c0.3,0,0.5,0.2,0.5,0.5S85.5,86.8,85.2,86.8z"
		 stroke="rgba(148, 20, 244, 1)"
		 strokeWidth="3.5"
		 />
	    </svg>
	);
    },

    FabricGaussian: undefined,
    loadGaussianSVGasFabricElement(gaussianSVGelement){
	//create a fabric element and store in this component
	const TS = this;
	fabric.loadSVGFromString(gaussianSVGelement.outerHTML, function(objects, options) {
	    TS.FabricGaussian = fabric.util.groupSVGElements(objects, options);
	});
    },
    
    
    flash(distVal, canvas, size){

	const cx = size.width  / 2;
	const cy = size.height / 2;
	const unit = cx/10;

	const FabricGaussian = this.FabricGaussian;
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
	    if(distVal === 4){
		return FabricGaussian.set({
		    opacity: 0,
		    left: cx, top: cy, originX: 'center', originY: 'center'
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

    
};

export default XYplane_flashPurpleDistributionShape;
