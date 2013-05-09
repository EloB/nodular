var should = require('should')
  , coffee = require('coffee-script')
  , express = require('express')
  , nodular = require('../index')
  , example = require('../examples/test');

describe('nodular', function() {
	it('should be a function', function() {
		nodular.should.be.an.instanceOf(Function);
	});
	
	it('should automatically require all arguments', function() {
		// Single include
		example(function(
		  error
		, file
		) {
			should.strictEqual(error, null);
			
			file.should.eql('File');
		});
		
		// Multiple includes
		example(function(
		  error
		, $express
		, file
		, fileWithDash
		, coffeeFile
		, coffeeFileWithDash
		, single
		) {
			should.strictEqual(error, null);
			
			express.should.equal($express);
			
			single.should.equal('Single value');
			
			file.should.equal('File');
			fileWithDash.should.equal('File with dash');
			
			coffeeFile.should.equal('Coffee file');
			coffeeFileWithDash.should.equal('Coffee file with dash');
		});
	});
	
	it('should throw an error if it can\'t the module', function() {
		example(function(
		  error
		, noneExistningModule
		) {
			error.should.not.equal(null);
		});
	});
	
	it('should automatically require all files from folder', function() {
		example(function(
		  error
		, multiple
		) {
			multiple.one.should.equal(1);
			multiple.two.should.equal(2);
			multiple.three.should.equal(3);
		});
	});
	
	it('should automatically require from node_modules when argument name begins with "$"', function() {
		nodular(require, function(
		  error
		, $express
		) {
			should.strictEqual(error, null);
			
			express.should.equal($express);
		});
	});
	
	describe('.camelToDash', function() {
		it('should convert camelcase to dash', function() {
			nodular.camelToDash('camelCase').should.eql('camel-case');
		});
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