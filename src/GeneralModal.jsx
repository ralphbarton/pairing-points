import React from 'react';

import Piccie from './asset/pic_with_alpha.png';

/*
 State.msgID
 1 - The maths question
 2 - web-app is under development
*/


function BodyJSX(props) {

    const State = props.state.GeneralModal;

    const toMsg = (id)=>{
	return props.updateState.bind(null, {GeneralModal: {msgID: {$set: id}}});
    };
    
    // Message 1 - math problem description
    if(State.msgID === 1){
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

	      <div className="piccie-container">
		<img src={Piccie} alt="" />
		<div  />
	      </div>
	      
	      <div className="responses">
		
		<div onClick={toMsg(2)}>
		  Yes
		</div>
		<div onClick={toMsg(2)}>
		  Not always
		</div>
		
	      </div>
	    </div>
	);
    }

    // Message 2 - web-app under development
    if(State.msgID === 2){
	return(
	    <div className={"box msgID"+State.msgID} style={{width: 600}}>

	      <p>
		This interactive geometry-related web-app is under development.
	      </p>
	      <p>
		Try visiting another time when it may be ready.
	      </p>	     
		
	      <div onClick={toMsg(1)} className="a">
		Back to the problem
	      </div>
	      <div className="s">
		It's open source -
		<a href="https://github.com/ralphbarton/pairing-points">
		  see the source-code on Github
		</a>
	      </div>
	      
	    </div>
	);
    }

    return null;
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
