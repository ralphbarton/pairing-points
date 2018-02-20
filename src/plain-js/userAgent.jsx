const userAgent = {

    parse_user_agent(){
	//bit of code taken from https://jsfiddle.net/oriadam/ncb4n882/
	//it cannot distinguish my Android tablet from my Android phone, but it'll do...

	const ua = navigator.userAgent; // raw User Agent String

	const browser = /Edge\/\d+/.test(ua) ? 'ed' : /MSIE 9/.test(ua) ? 'ie9' : /MSIE 10/.test(ua) ?
		  'ie10' : /MSIE 11/.test(ua) ? 'ie11' : /MSIE\s\d/.test(ua) ? 'ie?' : /rv:11/.test(ua) ? //changed this line (:)
		  'ie11' : /Firefox\W\d/.test(ua) ? 'ff' : /Chrome\W\d/.test(ua) ? 'gc' : /Chromium\W\d/.test(ua) ?
		  'oc' : /\bSafari\W\d/.test(ua) ? 'sa' : /\bOpera\W\d/.test(ua) ? 'op' : /\bOPR\W\d/i.test(ua) ?
		  'op' : typeof MSPointerEvent !== 'undefined' ? 'ie?' : '';
	
	const os = /Windows NT 10/.test(ua) ? "win10" : /Windows NT 6\.0/.test(ua) ?
		  "winvista" : /Windows NT 6\.1/.test(ua) ? "win7" : /Windows NT 6\.\d/.test(ua) ?
		  "win8" : /Windows NT 5\.1/.test(ua) ? "winxp" : /Windows NT [1-5]\./.test(ua) ?
		  "winnt" : /Mac/.test(ua) ? "mac" : /Linux/.test(ua) ? "linux" : /X11/.test(ua) ? "nix" : "";

	const mobile = /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'w' : /iPhone|iP[oa]d/.test(ua) ?
		  'i' : /Android/.test(ua) ? 'a' : /BlackBerry|PlayBook|BB10/.test(ua) ?
		  'b' : /Mobile Safari/.test(ua) ? 's' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0;

	const tablet = /Tablet|iPad/i.test(ua);

	// create a JS object from the parsed userAgent string...
	return {
	    browser: browser,
	    os: os,
	    mobile: mobile,
	    tablet: tablet
	};
    },

    
    device_intepret(){

	const ua_obj = this.parse_user_agent();

	const browser_convert = {
	    "ed": "Microsoft Edge",
	    "ie9": "Explorer 9",
	    "ie10": "Explorer 10",
	    "ie11": "Explorer 11",
	    "ie?": "Explorer of unknown version",
	    "ff": "Firefox",
	    "gc": "Chrome",
	    "oc": "Chromium",
	    "sa": "Safari",
	    "op": "Opera"
	};
	const conv_b = browser_convert[ua_obj.browser];

	const os_convert = {
	    "win7": "Windows 7",
	    "win8": "Windows 8",
	    "win9": "Windows 9",
	    "win10": "Windows 10",
	    "winvista": "Windows Vista",
	    "winxp": "Windows XP",
	    "winnt": "Windows NT",
	    "mac": "Apple",
	    "linux": "Linux",
	    "nix": "Nix"
	};
	const conv_o = os_convert[ua_obj.os];

/*
	const mobile_convert = {
	    "0": "Not mobile/tablet",
	    "w": "Nokia or other Windows Phone",
	    "i": "iOS - iPhone or iPad",
	    "a": "Android",
	    "b": "Blackberry",
	    "s": "Safari on non-iphone",
	    "1": "Other mobile or undetected"
	};
*/

	//The string returned needs to stand in place of X in the sentence: "Alex connected on X"
	switch (ua_obj.tablet){
	case true:
	    return "a tablet";
	default:
	    switch (ua_obj.mobile) {// this variable may be type string or integer in the different cases...
	    case 0:
		return "a desktop computer ("+conv_o+" / "+conv_b+")";
	    case "w":
		return "mobile (Windows phone)";
	    case "i":
		return "mobile (iPhone)";
	    case "a":
		return "mobile (Android)";// since it always seems to detect the browser as Chrome on an Andoid, even using
		//something else, I did not think there was much point in browser detection in the mobile case.
	    case "b":
		return "mobile (Blackberry)";
	    case "s":
		return "mobile (Safari on non-iphone)";
	    default: // this will typically be where switched variable is 1, type integer
		return "mobile";
	    }
	}
    }
    
};

export default userAgent;
