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

    const translate = (point, shift, newUID) => {
	return {
	    x: shift.x + point.x,
	    y: shift.y + point.y,
	    uid: newUID || point.uid
	};
    };

    
    const hofHandleFlipTransCopy = (xom)=>{

	// customise the handler. Use 'xom' parameter to look up the command, transform function, flag
	const cust = _.find([
	    {comm: 'x', trFn: flip,      cp_flag: "copy_xAxis" },
	    {comm: 'y', trFn: flip,      cp_flag: "copy_yAxis" },
	    {comm: 't', trFn: translate, cp_flag: "copy_translate"}
	], {comm: xom});
	const param = xom === 't' ? {x: State.translateX, y: State.translateY} : xom;

	return ()=>{
	    console.log("param: ", param);
	    var uidCount = props.state.CreatePointset.points_uidCount;
	    var $pointsUpdater;
	    var uidIncrement = 0;

	    if(State[cust.cp_flag]){
		const extraPoints = State.pointsByUid.map( uid => {
		    const point = _.find(props.state.CreatePointset.points, {uid});
		    return cust.trFn(point, param, uidCount++);
		});
		$pointsUpdater = {$push: extraPoints};
		uidIncrement = State.pointsByUid.length;
	    }else{
		const someFlippedPoints = _.map(props.state.CreatePointset.points, point => {
		    return inSelection(point) ? cust.trFn(point, param) : point;
		});
		$pointsUpdater = {$set: someFlippedPoints};
	    }

	    props.updateState({CreatePointset: {
		points: $pointsUpdater,
		points_nRedraw: $FnInc,
		points_uidCount: cnt => {return cnt + uidIncrement;}
	    }});
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
	    <button onClick={hofHandleFlipTransCopy("x")}>
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
	    <button onClick={hofHandleFlipTransCopy("y")}>
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
		       onChange={ev=>{set({translateX: {$set: Number(ev.target.value)}});}} />
	      </label>
	      <label>y:
		<input type="number"
		       min={-10}
		       max={10}
		       step={0.1}
		       value={State.translateY}
		       onChange={ev=>{set({translateY: {$set: Number(ev.target.value)}});}} />
	      </label>
	    </div>

	    <label>
	      <input type="checkbox"
		     checked={State.copy_translate}
		     onChange={ev=>{set({copy_translate: {$set: !State.copy_translate}});}} />
	      Create Copy
	    </label>
	    <button onClick={hofHandleFlipTransCopy("t")}>
	      Go
	    </button>
	  </div>
	  
	</Briefcase>

    );

}

export default PointsSelection;
