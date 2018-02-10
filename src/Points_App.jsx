import React from 'react';

import update from 'immutability-helper';


import ImportExportModal from './ImportExportModal';
import ControlsColumn from './ControlsColumn';
import XYplane from './XYplane';

import 'react-select/dist/react-select.css';

//var _ = require('lodash');

class Points_App extends React.Component {

    constructor(){
	super();
	this.state = {
	    BriefcaseOpen:{
		1: true,
		2: true,
		3: true,
		4: true
	    },
	    CreatePointset: {
		n: 10,
		dist: undefined,
		points: []
	    },
	    PairingAlgorithm: {
		alg: undefined
	    },
	    ImportExportModal: {
		visible: false,
		tab: 'E' // 'E' export, 'I' import
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

	      {/* 1. The Modal overlay (it may or may not actually be visible) */}
	      <ImportExportModal state={this.state} updateState={this.updateState} />
	      
	      {/* 2. Controls Area */}
	      <ControlsColumn state={this.state} updateState={this.updateState} />

	      {/* 3. The Canvas Area */}
	      <XYplane />
	    
	    </div>
	);
    }
}

export default Points_App;
