import React from 'react';

function Briefcase(props) {

    const upArrow = "1,14 10,4 19,14";
    const downArrow = "1,4 10,14 19,4";
    
    return (
	<div className={"Briefcase id-"+props.id + ' ' + (props.className || "")}>
	  <div className="title"
	       onClick={props.toggleOpen}
	       >{props.title}

	    <svg height="15" width="18" viewBox="0 0 20 20">
	      <polyline points={props.open ? upArrow: downArrow} />
	      </svg>

	  </div>
	  <div className={"content " + (props.open ? "open" : "")}>
	    {props.children}
	  </div>
	</div>
    );

}

export default Briefcase;
