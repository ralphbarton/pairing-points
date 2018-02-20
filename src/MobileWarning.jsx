import React from 'react';

function MobileWarning(props) {

    return (
	<div className="MobileWarning">
	  <p>
	    You device is detected as a mobile.
	  </p>
	  <p>
	    I have not optimized the CSS of this website to work on mobile devices. For various reasons, the website may not display correctly.
	  </p>
	  <p>
	    You can:
	  </p>
	  <p>
	    <a href="https://github.com/ralphbarton/pairing-points">Read about the project on Github (mobile friendly)</a>
	  </p>
	  <p>
	    <span onClick={props.updateState.bind(null, {MobileWarning: {useMobileAnyway: {$set: true}}})}
		 className="a">
	      See how the web-app renders on your device
	    </span>
	  </p>
	</div>
    );

}

export default MobileWarning;
