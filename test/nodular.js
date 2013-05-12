var should = require('should')
  , path = require('path')
  , coffeeScript = require('coffee-script')
  , nodular = require('../index')
  , example = require('../examples/test');

describe('nodular', function() {
	var noop = function() {};
	var dirname = path.resolve(__dirname, '..', 'examples/test');
	var NodularDirectory = nodular.NodularDirectory;
	var Nodular = nodular.Nodular;
	
	it('should be a function that returns a Nodular instance', function() {
		nodular.should.be.a('function');
		
		nodular(require, noop).should.be.an.instanceOf(nodular.Nodular);
	});
	
	it('should have a rootPath thats equals the dirname of callee caller file', function() {
		nodular(require, noop).rootPath.should.eql(__dirname);
	});
	
	describe('.utils', function() {
		it('should exports utils', function() {
			nodular.utils.should.equal(require('../lib/utils'));
		});
	});
	
	describe('.Nodular', function() {
		it('should have rootPath, require and callback properties', function() {
			var nodular = new Nodular(__dirname, require, noop);
			
			nodular.should.have.property('rootPath', __dirname);
			nodular.should.have.property('require').and.be.a('function');
			nodular.should.have.property('callback', noop);
			
			nodular = new Nodular();
			
			nodular.should.have.property('rootPath', path.resolve(__dirname, '..', 'lib'));
			nodular.should.have.property('require').and.be.a('function');
			nodular.should.have.property('callback').and.be.a('function');
		});
		
		describe('.execute', function() {
			it('should call the callback', function(done) {
				new Nodular(__dirname, require, function(error) {
					should.not.exist(error);
					
					done();
				});
			});
			
			it('should require all argument names', function(done) {
				new Nodular(dirname, require, function(error, $coffeeScript, file, fileWithDash, coffeeFile, coffeeFileWithDash, single, multiple) {
					should.not.exist(error);
					
					$coffeeScript.should.equal(coffeeScript);
					file.should.eql(require(dirname + '/file'));
					fileWithDash.should.eql(require(dirname + '/file-with-dash'));
					coffeeFile.should.eql(require(dirname + '/coffee-file'));
					coffeeFileWithDash.should.eql(require(dirname + '/coffee-file-with-dash'));
					single.should.eql(require(dirname + '/single'));
					
					multiple.should.be.an.instanceOf(NodularDirectory);
					multiple.should.eql({
						one: require(dirname + '/multiple/one'),
						two: require(dirname + '/multiple/two'),
						three: require(dirname + '/multiple/three'),
						four: require(dirname + '/multiple/four')
					});
					
					done();
				});
			});
			
			it('should be able to reuse the custom require method', function() {
				new Nodular(dirname, require, function(error) {
					var dont = this.require('./multiple/dont');
					
					dont.include.should.be.equal(require(dirname + '/multiple/dont/include'));
				});
			});
		});
	});
	
	describe('.NodularDirectory', function() {
		it('should take as first argument an object containing functions that will return the executed custom require method', function() {
			var one = require(dirname + '/multiple/one');
			var two = require(dirname + '/multiple/two');
			
			var nodularDirectory = new NodularDirectory({
				one: function() {
					return one;
				},
				two: function() {
					return two;
				}
			});
			
			nodularDirectory.should.have.property('one', one);
			nodularDirectory.should.have.property('two', two);
		});
		
		describe('.__requireAll', function() {
			it('should pre require all modules in directory', function() {
				
			});
		});
	});
});