var stackparser = require('nodular-stackparser');

// Get callee caller file
exports.getCalleeCallerFile = function() {
	var stackrows = stackparser(new Error());
	
	return stackrows[2].fileName;
};

// Get keys from object
exports.getKeys = function(obj) {
	var key, result;
	
	result = [];
	
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			result.push(key);
		}
	}
	
	return result;
};

// Get argument names from function
exports.getArgumentNames = function(fn) {
	var fnString
	  , argsString
	  , argsArray;
	
	if(typeof(fn) !== 'function') {
		throw new Error('The first argument should be an function');
	}
	
	argsArray = [];
	
	fnString = fn.toString().replace(PATTERN_STRIP_COMMENTS, '');
	argsString = fnString.match(PATTERN_FN_ARGS)[1].replace(PATTERN_TRIM, '');
	
	if(argsString !== '') {
		argsString.split(PATTERN_FN_ARGS_SPLIT).forEach(function(arg) {
			argsArray.push(arg);
		});
	}
	
	return argsArray;
};

var PATTERN_TRIM = /(^\s*|\s*$)/g
  , PATTERN_FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
  , PATTERN_FN_ARGS_SPLIT = /\s*,\s*/
  , PATTERN_STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

// Convert camel case to dash case
exports.convertCamelToDash = function(str) {
	return str.replace(/([A-Z])/g, camelToDashFilter);
};

var camelToDashFilter = function($1) {
	return "-" + $1.toLowerCase();
};