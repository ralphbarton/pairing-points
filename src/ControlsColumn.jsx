import React from 'react';

import CreatePointset from './CreatePointset';
import PointsSelection from './PointsSelection';
import PairingAlgorithm from './PairingAlgorithm';
import DisplaySettings from './DisplaySettings';

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

	  <CreatePointset
	     id="1"
	     open={isOpen[1]}
	     toggleOpen={HofTog(1)}
	     />

	  <PointsSelection
	     id="2"
	     open={isOpen[2]}
	     toggleOpen={HofTog(2)}
	     />

	  <PairingAlgorithm
	     id="3"
	     open={isOpen[3]}
	     toggleOpen={HofTog(3)}
	     />

	  <DisplaySettings
	     id="4"
	     open={isOpen[4]}
	     toggleOpen={HofTog(4)}
	     />
	    
	</div>
    );

}

export default ControlsColumn;
