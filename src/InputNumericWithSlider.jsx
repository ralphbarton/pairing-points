import React from 'react';
import Slider from 'rc-slider';

var _ = require('lodash');


function InputNumericWithSlider(props){

    const shared = _.pick(props, "min", "max", "value", "step");

    const getlogProps = () => {
	return {
	    min: 0,
	    max: Math.log2(props.max / props.min),
	    step: 0.0001,
	    value: _.round(Math.log2(props.value / props.min), 4),
	    onChange: (v)=>{
		props.setValue(_.round(props.min * (2**v), Math.log10(props.step)));
	    }
	};
    };
    
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

	      {props.logScale ?
		      <Slider {...getlogProps()} />
		   :
		      <Slider {...shared} onChange={ props.setValue } />
	      }

	      {props.logScale && <span>log scale</span>}
		      
	  </div>
    );
    
};

export default InputNumericWithSlider;
