import React from 'react';

import * as d3 from "d3";

class SprayOverlaySVG extends React.Component {

    constructor() {
	super();
	this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(e){
	this.setState({
	    mouseX: e.pageX,
	    mouseY: e.pageY
	});
    }
    
    componentDidMount()   { document.addEventListener('mousemove', this.handleMouseMove);    }
    componentWillUnmount() { document.removeEventListener('mousemove', this.handleMouseMove); }
    
    componentDidUpdate(){

	const BB = this.SVGelement.getBoundingClientRect();
	const x = this.state.mouseX - BB.left;
	const y = this.state.mouseY - BB.top;
	
	d3.select(this.SVGelement).select("circle").attr("cx", x).attr("cy", y);
	
    }
    
    render() {

	return (
	    <div className="SprayOverlaySVG">

	      <svg
		 width={this.props.width}
		 height={this.props.height}
		 ref={ el => {this.SVGelement = el;}}
		onMouseDown={(event) => { if(event.preventDefault) {event.preventDefault();}}}
		>
		<circle cx="-100" cy="-100" r={this.props.state.CreatePointset.SprayRadius} />
	      </svg>
	    </div>
	);
    }
}

export default SprayOverlaySVG;
