import React from 'react';

import Briefcase from './Briefcase';

import Select from 'react-select';

import InputNumericWithSlider from './InputNumericWithSlider';

var _ = require('lodash');

function UnitCircleRandUniform(){
    while(1){
	const x = 2*Math.random()-1;
	const y = 2*Math.random()-1;
	if((x**2 + y**2) <= 1){return {x,y};}
    }
};

function generateRandomlyDistributedPoints(State){

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
    
    if((dsV === 0)||(dsV === 1)){
	//circle radius 4 or 8
	return _.times(2*State.n, ()=>{
	    const unit = UnitCircleRandUniform();
	    return _.mapValues(unit, a=>{return (dsV+1)*4*a;});
	});

    }

    if(dsV === 2){
	return _.times(2*State.n, ()=>{
	    return {
		x: 8*Math.random()-4,
		y: 8*Math.random()-4
	    };
	});
    }

    if(dsV === 3){
	const rH = 20 * State.ratioHW;
	return _.times(2*State.n, ()=>{
	    return {
		x: 20*Math.random()-10,
		y: rH*(Math.random()-0.5)
	    };
	});
    }
    
    console.log("ratioHW",);
    return null;
};

function SprayOptions(props){

    const State = props.state.CreatePointset;
    
    return (
	<div className="SprayOptions">
	  
	  <div className="title">
	    spray points
	  </div>

	  <InputNumericWithSlider
	     value={State.SprayRadius}
	     setValue={ (v)=>{props.updateState({CreatePointset: {SprayRadius: {$set: v}}});}}
	     step={0.05}
	     min={0.1}
	     max={5}
	     description="circle radius:"
	    />

	    <InputNumericWithSlider
	       value={State.SprayRate}
	       setValue={ (v)=>{props.updateState({CreatePointset: {SprayRate: {$set: v}}});}}
	       min={2}
	       max={60}
	       description="spray rate:"
	       unit="points per second"
	      />
	  	  
	  <button
	     onClick={()=>{
		 props.updateState({CreatePointset: {SprayOverlay: {$set: false}}});
	    }}
	    >
	    Done
	  </button>


	</div>
    );
}







function CreatePointset(props){

    const State = props.state.CreatePointset;
    
    return (
	<Briefcase
	   id={props.id}
	   className="CreatePointset"
	   title="Points"
	   open={props.open}
	   toggleOpen={props.toggleOpen}>

	  <InputNumericWithSlider
	     value={State.n}
	     setValue={ (v)=>{props.updateState({CreatePointset: {n: {$set: v}}});}}
 	     step={1}
	     min={3}
	     max={300}
	     description="n="
	     logScale={true}
	    />

	  <div className="p">
	    <span>Distribution:</span>
	    <Select
	       value={State.dist && State.dist.value}
	       onChange={(sel) => {
		   props.updateState({CreatePointset: {
		       dist: {$set: sel},
		       dist_nChg: {$apply: x=>{return x+1;}}
		   }});
	      }}
	      options={[
		  { value: 0, label: 'Uniform (small circle)' },
		  { value: 1, label: 'Uniform (large circle)' },
		  { value: 2, label: 'Uniform (square)' },
		  { value: 3, label: 'Uniform (visible space)' },
		  { value: 4, label: '2D Gaussian (truncated)' },
	      ]}
	      clearable={false}
	      />
	  </div>

	  <div className="p">
	    <button className="generate"
		    onClick={()=>{
			const newPoints = generateRandomlyDistributedPoints(State);
			if(!newPoints){return;}
			props.updateState({CreatePointset: {points: {$set: newPoints}}});
	      }}
		    >
	      Randomly Generate 2n Points
	    </button>
	  </div>
	  
	  <div className="p">
	    <button
	       onClick={()=>{
		   props.updateState({CreatePointset: {points: {$set: []}}});
	      }}
	       >
	      Clear
	    </button>
	  </div>

	  <div className="p">
	    { State.SprayOverlay ?
		<SprayOptions {...props}/>
		    :
		<div className="a"
			 onClick={()=>{
			     props.updateState({CreatePointset: {SprayOverlay: {$set: true}}});
			 }}>
		      spray points
		</div>
	    }

	  </div>

	  <div className="p">
	    <div
	       className="a"
	       onClick={()=>{
		   props.updateState({ImportExportModal: {visible: {$set: true}}});
	      }}>import/export</div>
	  </div>
	  
	</Briefcase>

    );

}

export default CreatePointset;
