import React from 'react';

import Briefcase from './Briefcase';

function PairingAlgorithm(props) {

    return (
	<Briefcase
	   id={props.id}
	   className="PairingAlgorithm"
	   title="Pairing Algorithm"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >
	  Pairing Algorithm<br/>
	  the interface goes here...
	</Briefcase>

    );

}

export default PairingAlgorithm;
