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

	  <div className="p">
	    30 Points selected
	    <button className="delete">
	      Delete
	    </button>
	  </div>

	  <div className="p">
	    Flip in x-axis
	    <label><input type="checkbox" checked={props.checked} onChange={props.onChange}/>Create Copy</label>
	    <button>
	      Go
	    </button>
	  </div>

	  <div className="p">
	    Flip in y-axis
	    <label><input type="checkbox" checked={props.checked} onChange={props.onChange}/>Create Copy</label>
	    <button>
	      Go
	    </button>
	  </div>

	  <div className="p">
	    Translate
	    <label>x:<input type="number" value={1} readOnly={true} /></label>
	    <label>y:<input type="number" value={2} readOnly={true} /></label>
	    <label><input type="checkbox" checked={props.checked} onChange={props.onChange}/>Create Copy</label>
	    <button>
	      Go
	    </button>
	  </div>
	  
	</Briefcase>

    );

}

export default PointsSelection;
