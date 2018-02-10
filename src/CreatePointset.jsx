import React from 'react';

import Briefcase from './Briefcase';


import Select from 'react-select';

function SprayOptions(props){

    const State = props.state.CreatePointset;
    
    return (
	<div className="SprayOptions">
	  
	  <div className="title">
	    spray points
	  </div>
	  
	  <div className="p">
	    circle radius:
	    <input 
	       type="number"
	       value={State.SprayRadius}
	       min={15}
	       max={400}
	       onChange={(e) => {
		   props.updateState({CreatePointset: {SprayRadius: {$set: e.target.value}}});
	      }}
	      />
	      <span>pixels</span>
	  </div>


	  <div className="p">
	    spray rate:
	    <input type="number"
		   value={State.SprayRate}
		   min={1}
		   onChange={(e) => {
		       props.updateState({CreatePointset: {SprayRate: {$set: e.target.value}}});
	      }}
	      />
	      <span>points per second</span>
	  </div>



	  
	  <button
	     onClick={()=>{
		 props.updateState({CreatePointset: {SprayOverlay: {$set: false}}});
	    }}
	    >
	    Done
	  </button>


	</div>
    );
}







function CreatePointset(props){

    const State = props.state.CreatePointset;
    
    return (
	<Briefcase
	   id={props.id}
	   className="CreatePointset"
	   title="Points"
	   open={props.open}
	   toggleOpen={props.toggleOpen}>

	  <div className="p">
	    n= <input className="set-N"
		  type="number"
		  value={State.n}
		  min={1}
		  onChange={(e) => {
		      props.updateState({CreatePointset: {n: {$set: e.target.value}}});
	      }}
	      />
	  </div>

	  <div className="p">
	    <Select
	       value={State.dist && State.dist.value}
	       onChange={(sel) => {
		   props.updateState({CreatePointset: {dist: {$set: sel}}});
	      }}
	      options={[
		  { value: 0, label: 'Uniform (small circle)' },
		  { value: 1, label: 'Uniform (large circle)' },
		  { value: 2, label: 'Uniform (square)' },
		  { value: 3, label: 'Uniform (full space)' },
		  { value: 4, label: '2D Gaussian (truncated)' },
	      ]}
	      clearable={false}
	      />
	  </div>

	  <div className="p">
	    <button className="generate">
	      Randomly Generate 2n Points
	    </button>
	  </div>
	  
	  <div className="p">
	    <button>
	      Clear
	    </button>
	  </div>

	  <div className="p">
	    { State.SprayOverlay ?
		<SprayOptions {...props}/>
		    :
		<div className="a"
			 onClick={()=>{
			     props.updateState({CreatePointset: {SprayOverlay: {$set: true}}});
			 }}>
		      spray points
		</div>
	    }

	  </div>

	  <div className="p">
	    <div
	       className="a"
	       onClick={()=>{
		   props.updateState({ImportExportModal: {visible: {$set: true}}});
	      }}>import/export</div>
	  </div>
	  
	</Briefcase>

    );

}

export default CreatePointset;
