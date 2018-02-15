import React from 'react';

import update from 'immutability-helper';


import ImportExportModal from './ImportExportModal';
import GeneralModal from './GeneralModal';
import ControlsColumn from './ControlsColumn';
import XYplane from './XYplane';

import 'react-select/dist/react-select.css';

//var _ = require('lodash');

class Points_App extends React.Component {

    constructor(){
	super();
	this.state = {
	    ImportExportModal: {
		visible: false,
		tab: 'E' // 'E' export, 'I' import
	    },
	    GeneralModal:{
		msgID: 1
	    },
	    BriefcaseOpen:{
		1: true,
		2: false,
		3: false,
		4: false
	    },
	    CreatePointset: {
		n: 10,
		dist: undefined,
		dist_nChg: 0,
		points: [],
		SprayOverlay: false,
		SprayRadius: 1,
		SprayRate: 10,
		ratioHW: undefined // canvas height div width
	    },
	    PointsSelection:{
		copy_xAxis: false,
		copy_yAxis: false,
		copy_translate: false,
		translateX: 1,
		translateY: 1
	    },
	    PairingAlgorithm: {
		alg: {value: 0},
		alg0_angle: 0,
		alg0_speed: 1
	    },
	    DisplaySettings: {
		axes: true
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

	      {/* 1. Modal overlays (may or may not actually be visible) */}
	      <ImportExportModal state={this.state} updateState={this.updateState} />
	      <GeneralModal state={this.state} updateState={this.updateState} />
	      
	      {/* 2. Controls Area */}
	      <ControlsColumn state={this.state} updateState={this.updateState} />

	      {/* 3. The Canvas Area */}
	      <XYplane state={this.state} updateState={this.updateState} />
	    
	    </div>
	);
    }
}

export default Points_App;
