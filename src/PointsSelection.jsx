import React from 'react';

import Briefcase from './Briefcase';

function PointsSelection(props) {

    const State = props.state.PointsSelection;
    const set = $chg => {props.updateState({PointsSelection: $chg});};
    
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
	    {30} Points selected
	    <button className="delete">
	      Delete
	    </button>
	  </div>

	  <div className="p u-line">
	    <div>Flip in x-axis</div>
	    <label>
	      <input type="checkbox"
		     checked={State.copy_xAxis}
		     onChange={ev=>{set({copy_xAxis: {$set: !State.copy_xAxis}});}} />
		Create Copy
	    </label>
	    <button>
	      Go
	    </button>
	  </div>

	  <div className="p u-line">
	    <div>Flip in y-axis</div>
	    <label>
	      <input type="checkbox"
		     checked={State.copy_yAxis}
		     onChange={ev=>{set({copy_yAxis: {$set: !State.copy_yAxis}});}} />
	      Create Copy
	    </label>
	    <button>
	      Go
	    </button>
	  </div>

	  <div className="p u-line">
	    <div>Translate</div>

	    <div className="translation">
	      <label>x:
		<input type="number"
		       min={-10}
		       max={10}
		       step={0.1}
		       value={State.translateX}
		       onChange={ev=>{set({translateX: {$set: ev.target.value}});}} />
	      </label>
	      <label>y:
		<input type="number"
		       min={-10}
		       max={10}
		       step={0.1}
		       value={State.translateY}
		       onChange={ev=>{set({translateY: {$set: ev.target.value}});}} />
	      </label>
	    </div>

	    <label>
	      <input type="checkbox"
		     checked={State.copy_translate}
		     onChange={ev=>{set({copy_translate: {$set: !State.copy_translate}});}} />
	      Create Copy
	    </label>
	    <button>
	      Go
	    </button>
	  </div>
	  
	</Briefcase>

    );

}

export default PointsSelection;
