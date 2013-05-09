var PATTERN_TRIM = /(^\s*|\s*$)/g
  , PATTERN_FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
  , PATTERN_FN_ARGS_SPLIT = /\s*,\s*/
  , PATTERN_STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

module.exports = exports = function() {
	console.log('Here');
};

var getArgumentNames = exports.getArgumentNames = function(fn) {
	var fnString
	  , argsString
	  , argsArray;
	
	if(typeof(fn) !== 'function') {
		throw new Error('The first argument should be an function.');
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