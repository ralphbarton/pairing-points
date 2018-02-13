import React from 'react';

function BarIcon(props) {

    const upArrow = "1,14 10,4 19,14";
    const downArrow = "1,4 10,14 19,4";
    
    if(props.noOpen){
	
	if(props.open){return null;} // no flash message if the box is already open

	return <div className="noOpen">?</div>;
    }
    
    return (
	<svg height="15" width="18" viewBox="0 0 20 20">
	  <polyline points={props.open ? upArrow: downArrow} />
	</svg>
    );
}

class Briefcase extends React.Component {
    
    constructor(){
	super();
	this.state = {
	    msg: false
	};
	this.flashMsg = this.flashMsg.bind(this);
    }

    flashMsg(){
	this.setState({msg: true});
	setTimeout( ()=>{
	    this.setState({msg: false});
	}, 2000);
    }


    render(){

	const props = this.props;
	
	return (
	    <div className={"Briefcase id-"+props.id + ' ' + (props.className || "")}>
	      <div className="title"
		   onClick={props.noOpen?this.flashMsg:props.toggleOpen}
		   >{props.title}

		<BarIcon {...props} />

	      </div>
	      <div className={"content " + (props.open ? "open" : "")}>
		{props.children}
	      </div>
	      <div className={"content queryMsg " + (this.state.msg ? "open" : "")}>
		<div>
		  {props.queryMsg}
		</div>
	      </div>
	    </div>
	);
    }
	
}

export default Briefcase;
