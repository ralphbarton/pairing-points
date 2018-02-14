import React from 'react';

import Briefcase from './Briefcase';
import HavardobSwitch from './HavardobSwitch';


function DisplaySettings(props) {

    const State = props.state.DisplaySettings;
    
    return (
	<Briefcase
	   id={props.id}
	   className="DisplaySettings"
	   title="Display"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >

	  <div className="p">
	    <HavardobSwitch
	       description="Axes:"
	       checked={State.axes}
	       onChange={()=>{props.updateState({DisplaySettings: {axes: {$set: !State.axes}}});}}
	       />
	  </div>
	    
	</Briefcase>

    );

}

export default DisplaySettings;
