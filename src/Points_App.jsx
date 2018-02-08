import React from 'react';


/*
import update from 'immutability-helper';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
 */

import XYplane from './XYplane';

var _ = require('lodash');

class Points_App extends React.Component {

    constructor(){
	super();
	this.state = {
	    Pointset: {
		n: 10,
		dist: null,
		points: []
	    }
	};
    }

    
    render() {

	return (
	    <div className="Points_App">

	      {/* 1. Heading Area */}
	      <div className="title">
		The points app
		<div>built in React</div>
	      </div>

	      <XYplane />
	    
	    </div>
	);
    }
}

export default Points_App;
