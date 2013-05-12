// Module dependencies.
var fs = require('fs')
  , path = require('path')
  , utils = require('./utils');

// Exports
module.exports = exports = nodular;
exports.utils = utils;
exports.Nodular = Nodular;
exports.NodularDirectory = NodularDirectory;

// Nodular
function nodular(require, callback) {
	var fileName = exports.utils.getCalleeCallerFile();
	
	return new Nodular(path.dirname(fileName), require, callback);
}

// Nodular
function Nodular(rootPath, parentRequire, callback, execute) {
	this.require = (function(scope, require) {
		var pattern = new RegExp('(\\' + utils.getKeys(require.extensions).join('|\\') + ')$');
		
		return function customRequire(dirname) {
			var fileName;
			
			try {
				return require(dirname);
			} catch(e) {
				dirname = path.resolve(scope.rootPath, dirname);
				
				try {
					fileName = require.resolve(dirname);
				} catch(e) {
					var stat = fs.statSync(dirname);
					
					if(stat.isDirectory()) {
						var obj = {};
						
						fs.readdirSync(dirname).forEach(function(file) {
							try {
								var name;
								
								fileName = path.resolve(dirname, file);
								
								require.resolve(fileName);
								
								name = file.replace(pattern, '');
								file = fileName;
								
								obj[name] = function() {
									return customRequire(file);
								};
							} catch(e) {}
						});
						
						return new NodularDirectory(obj);
					} else {
						throw new Error('Couldn\'t not found module, ' + dirname);
					}
				}
			}
			
			return require(fileName);
		};
	})(this, parentRequire || require);
	this.rootPath = path.resolve(rootPath || __dirname);
	this.callback = callback || noop;
	
	if(execute !== false) {
		this.execute();
	}
}

var noop = function() {};

Nodular.prototype.execute = function() {
	var args
	  , scope
	  , error;
	
	error = null;
	scope = this;
	
	args = utils.getArgumentNames(this.callback).slice(1);
	
	args.forEach(function(arg, index, arr) {
		arg = utils.convertCamelToDash(arg);
		
		try {
			if(PATTERN_DOLLAR.test(arg)) {
				arr[index] = scope.require(arg.replace(PATTERN_DOLLAR, ''));
			} else {
				arr[index] = scope.require(arg);
			}
		} catch(e) {
			error = error;
		}
	});
	
	args.unshift(error);
	
	this.callback.apply({ require: this.require }, args);
	
	return this;
};

var PATTERN_DOLLAR = /^\$/;

// NodularDirectory
function NodularDirectory(obj) {
	var key, scope;
	
	for(key in obj) {
		if(obj.hasOwnProperty(key)) {
			(function(scope, name) {
				scope.__defineGetter__(name, function() {
					var tmp = obj[name]();
					
					delete scope[name];
					
					return scope[name] = tmp;
				});
			})(this, key);
		}
	}
}

NodularDirectory.prototype.__requireAll = function() {
	var key;
	
	for(key in this) {
		if(this.hasOwnProperty(key)) {
			this[key];
		}
	}
};