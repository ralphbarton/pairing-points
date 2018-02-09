import React from 'react';

import update from 'immutability-helper';

/*
import Select from 'react-select';
import 'react-select/dist/react-select.css';
 */

import ControlsColumn from './ControlsColumn';
import XYplane from './XYplane';

//var _ = require('lodash');

class Points_App extends React.Component {

    constructor(){
	super();
	this.state = {
	    BriefcaseOpen:{
		1: false,
		2: true
	    },
	    Pointset: {
		n: 10,
		dist: null,
		points: []
	    }
	};
	this.updateState = this.updateState.bind(this);
    }

    updateState($update){
	this.setState(update(this.state, $update));
    }
    
    
    render() {

	return (
	    <div className="Points_App">

	      {/* 1. Controls Area */}
	      <ControlsColumn
		 state={this.state}
		 updateState={this.updateState}
		 />

	      {/* 2. The Canvas Area */}
	      <XYplane />
	    
	    </div>
	);
    }
}

export default Points_App;
