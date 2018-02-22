import {fabric}  from 'fabric';

const XYplane_FabricCanvas = {

    
    regenerate(plainCanvasElement, canvas, size, points){

	if(canvas){
	    canvas.dispose();
	}

	canvas = new fabric.Canvas(plainCanvasElement);
	canvas.renderOnAddRemove = false; //massive boost to performance when adding many objects!!

	//for debug interaction in console:
	window.canvas = canvas;

	/*
	 var circle = new fabric.Circle({
	 radius: 100, fill: '#F90', left: 100, top: 130
	 });
	 var triangle = new fabric.Triangle({
	 width: 160, height: 220, angle: 30, fill: '#29A', left: 350, top: 20
	 });

	 canvas.add(circle, triangle);
	 */

	this.addPoints(canvas, size, points);
	
	return canvas;
	
    },

    
    addPoints(canvas, size, points){

	const W = size.width;
	const H = size.height;
	const rH = 20 * H/W;

	// rescale each of those points into pixel coordinate system and put on Canvas
	points.forEach( point => {
	    canvas.add(
		new fabric.Circle({
		    // small radius 4, large radius 8
		    radius: 3, fill: 'black',
		    //stroke: 'rgba(148, 20, 244, 1)', strokeWidth: 3,
		    left: W * (point.x+10) / 20,
		    top: H * (1-((point.y+rH/2) / rH)),
		    originX: 'center', originY: 'center',
		    uid: point.uid // this is a non-fabric property...
		})
	    );
	});
	
    },

    
    handleAnimationFrame(canvas, time, endAnimation){

	/*  EXAMPLE CODE for how to use the 'time' argument of this function */
	//	const progress = Math.round(time / this.durationMs * 10000)/100;
	//	const progress2 = progress % 100; //Mod100
	//	this.bar.style.width = `${progress2}%`;

	/*
	const oldTop = canvas._objects[0].top;
	if(oldTop>100){this.incr = -0.1;}
	if(oldTop<30) {this.incr = +0.1;}
	
	canvas._objects[0].setTop(oldTop + this.incr);
	canvas._objects[0].setRadius(oldTop/3);
	 */

	// note: continuous calling of this function is needed for added and removed points to be reflected on screen
	canvas.renderAll();


	//	 endAnimation(); // API of the higher order component. I don't think I ever need to do this

    }
    
};

export default XYplane_FabricCanvas;
