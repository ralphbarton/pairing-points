import React from 'react';

import Briefcase from './Briefcase';

import Select from 'react-select';

import InputNumericWithSlider from './InputNumericWithSlider';

function AlgorithmSettings(props) {

    const State = props.state.PairingAlgorithm;

    //Sweeping Line
    if(State.alg.value === 0){
	return (
	    <div className="p">
	      <InputNumericWithSlider
		 value={State.alg0_angle}
		 setValue={ (v)=>{props.updateState({PairingAlgorithm: {alg0_angle: {$set: v}}});}}
		step={1}
		min={0}
		max={360}
		description="angle:"
		unit="degrees"
		/>
		<InputNumericWithSlider
		   value={State.alg0_speed}
		   setValue={ (v)=>{props.updateState({PairingAlgorithm: {alg0_speed: {$set: v}}});}}
		  step={0.1}
		  min={0.5}
		  max={10}
		  description="sweep speed:"
		  unit="duration, seconds"
		  logScale={true}
		  noLogScaleLabel={true}
		  />
	    </div>
	);
    }

    //Convex Hull
    if(State.alg.value === 1){
	return (
	    null
	);
    }

    //Find Nearest
    if(State.alg.value === 2){
	return (
	    null
	);
    }

    return null;
};

function PairingAlgorithm(props) {

    const State = props.state.PairingAlgorithm;
    
    return (
	<Briefcase
	   id={props.id}
	   className="PairingAlgorithm"
	   title="Pairing Algorithm"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >

	  <div className="p">
	    <Select
	       name="form-field-name"
	       value={State.alg && State.alg.value}
	       onChange={(sel) => {
		   props.updateState({PairingAlgorithm: {alg: {$set: sel}}});
	      }}
	      options={[
		  { value: 0, label: 'Sweeping Line' },
		  { value: 1, label: 'Convex Hull' },
		  { value: 2, label: 'Find Nearest' },
	      ]}
	      clearable={false}
	      />
	  </div>

	  {State.alg && 
	      <AlgorithmSettings {...props}/>
	  }

	  <div className="p">
	    <button>
	      Run Animation
	    </button>
	  </div>
	  <div className="p">
	    <button>
	      Reset
	    </button>
	  </div>
	      
	</Briefcase>

    );

}

export default PairingAlgorithm;
