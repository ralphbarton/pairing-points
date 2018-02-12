import React from 'react';
import Slider from 'rc-slider';

var _ = require('lodash');


function InputNumericWithSlider(props){

    const shared = _.pick(props, "min", "max", "value");
    
    return (
	<div className="InputNumericWithSlider">
	    {props.description}
	    <input 
	       type="number"
	       {...shared}
	       onChange={(e) => {
		   props.setValue(e.target.value);
	      }}
	      />
	      {props.unit &&
		  <span>{props.unit}</span>
	      }
		  
	    <Slider
		 {...shared}
		 onChange={ props.setValue }
		/>

	  </div>
    );
    
};

export default InputNumericWithSlider;
