import React from 'react';

import Briefcase from './Briefcase';

import Select from 'react-select';

import InputNumericWithSlider from './InputNumericWithSlider';



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
	     min={15}
	     max={400}
	     description="circle radius:"
	     unit="pixels"
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
	     min={1}
	     max={600}
	     description="n="
	    />

	  <div className="p">
	    <span>Distribution:</span>
	    <Select
	       value={State.dist && State.dist.value}
	       onChange={(sel) => {
		   props.updateState({CreatePointset: {dist: {$set: sel}}});
	      }}
	      options={[
		  { value: 0, label: 'Uniform (small circle)' },
		  { value: 1, label: 'Uniform (large circle)' },
		  { value: 2, label: 'Uniform (square)' },
		  { value: 3, label: 'Uniform (full space)' },
		  { value: 4, label: '2D Gaussian (truncated)' },
	      ]}
	      clearable={false}
	      />
	  </div>

	  <div className="p">
	    <button className="generate">
	      Randomly Generate 2n Points
	    </button>
	  </div>
	  
	  <div className="p">
	    <button>
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
