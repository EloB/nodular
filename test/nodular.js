var assert = require('should')
  , nodular = require('../index');

describe('nodular', function() {
	it('should be a function', function() {
		nodular.should.be.an.instanceOf(Function);
	});
	
	describe('.getArgumentNames', function() {
		it('should throw an error if the first argument isn\'t a function', function() {
			[undefined, 1, '', [], {}].forEach(function(value) {
				(function() {
					nodular.getArgumentNames(value);
				}).should.throw();
			});
			
			(function() {
				nodular.getArgumentNames(function(){});
			}).should.not.throw();
		});
		
		it('should return an array', function() {
			nodular.getArgumentNames(function() {}).should.be.an.instanceOf(Array);
		});
		
		it('should return the function argument names', function() {
			nodular.getArgumentNames(function() {}).should.eql([]);
			nodular.getArgumentNames(function(/* Works? */) {}).should.eql([]);
			nodular.getArgumentNames(function(a, /* Works? */b) {}).should.eql(['a', 'b']);
			nodular.getArgumentNames(function(a, b /* Works? */) {}).should.eql(['a', 'b']);
			nodular.getArgumentNames(function(a, b, c) {}).should.eql(['a', 'b', 'c']);
			nodular.getArgumentNames(function(one, two, three) {}).should.eql(['one', 'two', 'three']);
		});
	});
});