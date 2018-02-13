import React from 'react';



function HavardobSwitch(props){

    return(
    	  <div className="HavardobSwitch">

	    <span>
	      {props.description}
	    </span>
	    
	    <label>
	      <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
		<div>
		  <span className="on">On</span>
		  <span className="off">Off</span>
		</div>
		<i></i>
	    </label>

	  </div>
    );
    
}


export default HavardobSwitch;
