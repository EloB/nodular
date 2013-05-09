// Module dependencies.
var fs = require('fs')
  , path = require('path');

// Patterns
var PATTERN_TRIM = /(^\s*|\s*$)/g
  , PATTERN_STACK_ALL = /([^(]*):\d+:\d+\)/g
  , PATTERN_STACK = /([^(]*):\d+:\d+\)/
  , PATTERN_DOLLAR = /^\$/
  , PATTERN_FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
  , PATTERN_FN_ARGS_SPLIT = /\s*,\s*/
  , PATTERN_STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

var scope = {};

// Exports
module.exports = exports = function(parentRequire, callback) {
	var injects
	  , matches
	  , error
	  , args
	  , dirname
	  , extensions
	  , extensionPattern;
	
	// Haxxor way of getting __dirname from caller file
	// console.time('Benchmark');
	try {
	    throw new Error();
	} catch (e) {
		matches = e.stack.match(PATTERN_STACK_ALL);
		
		dirname = path.dirname(matches[1].match(PATTERN_STACK)[1]);
	}
	// console.timeEnd('Benchmark');
	
	extensions = getKeys(parentRequire.extensions);
	
	extensionPattern = new RegExp('(\\' + extensions.join('|\\') + ')$');
	
	injects = [null];
	
	try {
		getArgumentNames(callback).slice(1).forEach(function(arg, index) {
			var inject;
			
			arg = camelToDash(arg);
			
			if(PATTERN_DOLLAR.test(arg)) {
				arg = arg.replace(PATTERN_DOLLAR, '');
				
				inject = parentRequire(arg);
			} else {
				var resolvePath = path.resolve(dirname, arg);
				
				try {
					inject = parentRequire(resolvePath);
				} catch(e) {
					if(fs.existsSync(resolvePath)) {
						inject = {};
						
						if(fs.statSync(resolvePath).isDirectory()) {
							fs.readdirSync(resolvePath).forEach(function(item, index) {
								var fullPath = path.resolve(resolvePath, item);
								
								try {
									fullPath = parentRequire.resolve(fullPath);
									item = item.replace(extensionPattern, '');
									inject.__defineGetter__(item, function() {
										var tmp = require(fullPath);
										
										delete inject[item];
										
										return inject[item] = tmp;
									});
								} catch(e) {}
							});
						} else {
							throw e;
						}
					} else {
						throw new Error('Argument, ' + arg + ', with path, ' + resolvePath + ', doesn\'t exists');
					}
				}
			}

			injects.push(inject);
		});
	} catch(error) {
		injects = [error];
	}
	
	callback.apply(scope, injects);
};

var camelToDash = exports.camelToDash = function(str) {
	return str.replace(/([A-Z])/g, camelToDashCallback);
};

var camelToDashCallback = function($1) {
	return "-" + $1.toLowerCase();
};

var getKeys = exports.getKeys = function(obj) {
	var key
	  , result;
	
	result = [];
	
	for(key in obj) {
		result.push(key);
	}
	
	return result;
};

var getArgumentNames = exports.getArgumentNames = function(fn) {
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