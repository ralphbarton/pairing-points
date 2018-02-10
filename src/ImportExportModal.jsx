import React from 'react';



function ImportJSX(props) {
    return(
	<div>
	  Paste data below:
	  <textarea />
	</div>
    );
}

function ExportJSX(props) {
    return(
	<div>
	  Hello I'm the body - Export
	</div>
    );
}


function ImportExportModal(props) {

    const State = props.state.ImportExportModal;

    return (
	<div className={"ImportExportModal " + (State.visible ? "visible" : "")}>

	  <div className="box">

	    {/* 1. The Tabs */}
	    <div className="tabStrip">
	      <div className={State.tab==='E'?'sel':''}
		   onClick={()=>{
		       props.updateState({ImportExportModal: {tab: {$set: 'E'}}});
		   }}
		   >
		Export
	      </div>
	      <div className={State.tab==='I'?'sel':''}
		   onClick={()=>{
		       props.updateState({ImportExportModal: {tab: {$set: 'I'}}});
		   }}
		   >
		Import
	      </div>
	    </div>

	    {/* 2. The box Body */}
	    <div className="body">

	      {State.tab==='E'?ExportJSX(props):ImportJSX(props)}

	      <button
		 onClick={()=>{
		     props.updateState({ImportExportModal: {visible: {$set: false}}});
		}}
		>
		Done
	      </button>
	      
	    </div>
	  </div>

	  
	</div>
    );

}

export default ImportExportModal;
