import React from 'react';

import Briefcase from './Briefcase';

function CreatePointset(props) {

    return (
	<Briefcase
	   id={props.id}
	   className="CreatePointset"
	   title="Points"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >
	  n= <br/>
	  the interface goes here...
	</Briefcase>

    );

}

export default CreatePointset;
