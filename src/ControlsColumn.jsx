import React from 'react';

import Briefcase from './Briefcase';

function ControlsColumn(props) {

    const isOpen = props.state.BriefcaseOpen;

    const HofTog = function(id){
	return ()=>{
	    props.updateState({BriefcaseOpen: {[id]: {$set: !isOpen[id]}}});
	};
    };
    
    return (
	<div className="ControlsColumn">

	  <div className="Logo">
	    Pairing Points
	  </div>

	  <Briefcase
	     id="1"
	     title="George"
	     open={isOpen[1]}
	     toggleOpen={HofTog(1)}
	     >
	    My Briefcase 1
	  </Briefcase>

	  <Briefcase
	     id="2"
	     title="Adam"
	     open={isOpen[2]}
	     toggleOpen={HofTog(2)}
	     >
	    My Briefcase 2
	  </Briefcase>

	    
	</div>
    );

}

export default ControlsColumn;
