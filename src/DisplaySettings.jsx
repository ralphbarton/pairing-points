import React from 'react';

import Briefcase from './Briefcase';

function DisplaySettings(props) {

    return (
	<Briefcase
	   id={props.id}
	   className="DisplaySettings"
	   title="Display"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >
	  Display Settings <br/>
	  the interface goes here...
	</Briefcase>

    );

}

export default DisplaySettings;
