import React from 'react';

import Select from 'react-select';

import Briefcase from './Briefcase';
import InputNumericWithSlider from './InputNumericWithSlider';

import GeneratePoints from './plain-js/GeneratePoints';

const $FnInc = x=>{return x+1;};

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
	       min={20}
	       max={100}
	       step={20}
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
		       dist_nChg: $FnInc // shorthand: omit the {$apply: ...}
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
			const newPoints = GeneratePoints.distribute(State);
			if(!newPoints){return;}
			props.updateState({CreatePointset: {
			    points: {$set: newPoints},
			    points_nRedraw: $FnInc
			}});
	      }}
		    >
	      Randomly Generate 2n Points
	    </button>
	  </div>
	  
	  <div className="p">
	    <button
	       onClick={()=>{
		   props.updateState({CreatePointset: {points: {$set: []}, points_nRedraw: $FnInc}});
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
