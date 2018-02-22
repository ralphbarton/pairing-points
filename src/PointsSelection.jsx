import React from 'react';

import Briefcase from './Briefcase';

var _ = require('lodash');

const $FnInc = x=>{return x+1;};

function PointsSelection(props) {

    const State = props.state.PointsSelection;
    const set = $chg => {props.updateState({PointsSelection: $chg});};

    const nPoints = props.state.CreatePointset.points.length;
    const normalMsg = "use the mouse to make a selection of points in the XY plane...";
    const emptyMsg =  "create some points on the XY plane, then make a selection with the mouse";

    const inSelection = p=>{return _.indexOf(State.pointsByUid, p.uid) !== -1;};
    const not_inSelection = p=>{return _.indexOf(State.pointsByUid, p.uid) === -1;};

    const flip = (point, axis, newUID) => {
	return {
	    x: (axis==='y'?-1:1) * point.x, // note that flip in y-axis means flip sign on x-coordinate. Confusing!!
	    y: (axis==='x'?-1:1) * point.y,
	    uid: newUID || point.uid
	};
    };
    
    return (
	<Briefcase
	   id={props.id}
	   className="PointsSelection"
	   title="Points Selection"
	   open={props.open}
	   queryMsg={nPoints>0?normalMsg:emptyMsg}
	   noOpen={true} //this means the users does not get an arrow to open and close
	   >

	  <div className="p">
	    {State.pointsByUid.length} Points selected
	    <button className="delete"
		    onClick={()=>{

			// Create a new array of only non-selected points. Invoke rerender.
			// non selected points will not be found in PointsSelectionpointsByUid
			const filteredPoints = _.filter(props.state.CreatePointset.points, not_inSelection);

			props.updateState({CreatePointset: {
			    points: {$set: filteredPoints},
			    points_nRedraw: $FnInc
//			    points_uidCount: cnt => {return cnt+State.n*2;},
			}});
	      }}
	      >
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
	    <button
	       onClick={()=>{

		   var uidCount = props.state.CreatePointset.points_uidCount;
		   var $pointsUpdater;
		   var uidIncrement = 0;

		   if(State.copy_xAxis){
		       const extraPoints = State.pointsByUid.map( uid => {
			   const point = _.find(props.state.CreatePointset.points, {uid});
			   return flip(point, 'x', uidCount++);
		       });
		       $pointsUpdater = {$push: extraPoints};
		       uidIncrement = State.pointsByUid.length;
		   }else{
		       const someFlippedPoints = _.map(props.state.CreatePointset.points, point => {
			   return inSelection(point) ? flip(point, 'x') : point;
		       });
		       $pointsUpdater = {$set: someFlippedPoints};
		   }

		   props.updateState({CreatePointset: {
		       points: $pointsUpdater,
		       points_nRedraw: $FnInc,
		       points_uidCount: cnt => {return cnt + uidIncrement;}
		   }});
	      }}
	       >
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
