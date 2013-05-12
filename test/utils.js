var nodular = require('../index')
  , stackparser = require('nodular-stackparser')
  , path = require('path');

describe('utils', function() {
	var utils = nodular.utils;
	
	describe('.getCalleeCallerFile', function() {
		it('should return the caller file', function() {
			var stackrows = stackparser(new Error());
			
			stackrows[1].fileName.should.eql(utils.getCalleeCallerFile());
		});
	});
	
	describe('.getKeys', function() {
		it('should return all the keys from an object', function() {
			var Cls = function() {
				this['this'] = true;
			};
			
			Cls.prototype.notThis = function() {};
			
			var obj1 = {
				one: 1,
				two: 2,
				three: 3
			};
			
			var obj2 = new Cls();
			
			obj2.andThis = true;
			
			utils.getKeys(obj1).should.eql(['one', 'two', 'three']);
			utils.getKeys(obj2).should.eql(['this', 'andThis']);
		});
	});
	
	describe('getArgumentNames', function() {
		it('should return the argument names from a function', function() {
			var evalFn;
			
			var fn = eval('evalFn = function(a,b,c) {}');
			
			utils.getArgumentNames(evalFn).should.eql(['a', 'b', 'c']);
			utils.getArgumentNames(function(a) {}).should.eql(['a']);
			utils.getArgumentNames(function(a , b) {}).should.eql(['a', 'b']);
			utils.getArgumentNames(function(a,b) {}).should.eql(['a', 'b']);
			utils.getArgumentNames(function(one) {}).should.eql(['one']);
			utils.getArgumentNames(function(one, two) {}).should.eql(['one', 'two']);
			utils.getArgumentNames(function(one, two, three) {}).should.eql(['one', 'two', 'three']);
			utils.getArgumentNames(function(one/*, two*/, three) {}).should.eql(['one', 'three']);
			utils.getArgumentNames(function(one,
				two, three) {}).should.eql(['one', 'two', 'three']);
		});
	});
	
	describe('.convertCamelToDash', function() {
		it('should convert to camelcase to dashcase', function() {
			utils.convertCamelToDash('aTest').should.eql('a-test');
			utils.convertCamelToDash('andAnotherTest').should.eql('and-another-test');
		})
	});
});