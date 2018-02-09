import React from 'react';

import Briefcase from './Briefcase';

import Select from 'react-select';

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
	  
	</Briefcase>

    );

}

export default PairingAlgorithm;
