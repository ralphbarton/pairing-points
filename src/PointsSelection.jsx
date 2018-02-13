import React from 'react';

import Briefcase from './Briefcase';

function PointsSelection(props) {

    return (
	<Briefcase
	   id={props.id}
	   className="PointsSelection"
	   title="Points Selection"
	   open={props.open}
	   queryMsg="use the mouse to make a selection of points in the XY plane..."
	   noOpen={true}
	   >
	  Points Selection <br/>
	  the interface goes here...
	</Briefcase>

    );

}

export default PointsSelection;
