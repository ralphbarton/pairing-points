import React from 'react';

import Piccie from './asset/pic_with_alpha.png';

function BodyJSX(props) {

    const State = props.state.GeneralModal;
    
    return(
	<div className={"box msgID"+State.msgID} style={{width: 700}}>

	  <div className="title">
	    A maths question:
	  </div>

	  <p>
	  There are 2n points in the XY plane, with no 3 points collinear.
	  </p>
	  <p>
	  Can n lines be drawn between pairs of points so that all points are paired with no lines crossing?
	  </p>

	<img src={Piccie} alt="" />
	  
	  <div className="responses">
	  
	    <div>
	      Yes
	    </div>
	    <div>
	      Not always
	    </div>
	  
	  </div>
	</div>
    );
}


function GeneralModal(props) {

    const State = props.state.GeneralModal;

    return (
	<div className={"GeneralModal " + (State.msgID !== null ? "visible" : "")}>

	  <div >

	    <BodyJSX {...props}/>

	  </div>
	  
	</div>
    );

}

export default GeneralModal;
