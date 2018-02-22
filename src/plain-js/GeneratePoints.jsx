var _ = require('lodash');

const GeneratePoints = {

    UnitCircleRandUniform(){
	while(1){
	    const x = 2*Math.random()-1;
	    const y = 2*Math.random()-1;
	    if((x**2 + y**2) <= 1){return {x,y};}
	}
    },

    
    distribute(State){

	/*
	 distVal:
	 0 - 'Uniform (small circle)'
	 1 - 'Uniform (large circle)'
	 2 - 'Uniform (square)'
	 3 - 'Uniform (visible space)'
	 4 - '2D Gaussian (truncated)'
	 */
	
	if(!State.dist){return null;}
	const dsV = State.dist.value;

	var uidCount = State.points_uidCount;
	
	if((dsV === 0)||(dsV === 1)){
	    //circle radius 4 or 8
	    return _.times(2*State.n, ()=>{
		const unit = this.UnitCircleRandUniform();
		return {
		    x: (dsV+1)*4*unit.x,
		    y: (dsV+1)*4*unit.y,
		    uid: uidCount++
		};
	    });

	}

	if(dsV === 2){
	    // square
	    return _.times(2*State.n, ()=>{
		return {
		    x: 8*Math.random()-4,
		    y: 8*Math.random()-4,
		    uid: uidCount++
		};
	    });
	}

	if(dsV === 3){
	    // full screen
	    const rH = 20 * State.ratioHW;
	    return _.times(2*State.n, ()=>{
		return {
		    x: 20*Math.random()-10,
		    y: rH*(Math.random()-0.5),
		    uid: uidCount++
		};
	    });
	}
	
	return null;
    },

    sprayerTick(canvas_BoundingBox, mouse, radius, n_points_per_tick, points_uidCount, updateState){
	const x = mouse.mouseX - canvas_BoundingBox.left;
	const y = mouse.mouseY - canvas_BoundingBox.top;

	const W = canvas_BoundingBox.width;
	const H = canvas_BoundingBox.height;
	const rH = 20 * (H/W);

	//now convert mouse pixel-coordininates into XY-plane coordate system:
	const mXYcoords = {
	    x: (x/W - 0.5) * 20,
	    y: (0.5 - y/H) * rH
	};

	var uidCount = points_uidCount;
	const getOnePoint = ()=>{
	    const unitCircle = GeneratePoints.UnitCircleRandUniform();
	    const scaledCircle = _.mapValues(unitCircle, (v,k)=>{return radius * v + mXYcoords[k];}); //transform mx+c
	    scaledCircle.uid = uidCount++;
	    return scaledCircle;
	};

	updateState({CreatePointset: {
	    points: {$push: _.times(n_points_per_tick, getOnePoint)},
	    points_uidCount: cnt => {return cnt + n_points_per_tick;}//increment the counter
	}});
    }
    
};

export default GeneratePoints;
