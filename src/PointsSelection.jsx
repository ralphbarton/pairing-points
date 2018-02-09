import React from 'react';

import Briefcase from './Briefcase';

function PointsSelection(props) {

    return (
	<Briefcase
	   id={props.id}
	   className="PointsSelection"
	   title="Points Selection"
	   open={props.open}
	   toggleOpen={props.toggleOpen}
	   >
	  Points Selection <br/>
	  the interface goes here...
	</Briefcase>

    );

}

export default PointsSelection;
