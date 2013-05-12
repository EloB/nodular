var nodular = require('../../index');

nodular(require, function(
  error
, $nodularStackparser
, file
, fileWithDash
, coffeeFile
, coffeeFileWithDash
, multiple
) {
	if(error) throw error;
	
	console.log($nodularStackparser);
	console.log(file);
	console.log(fileWithDash);
	console.log(coffeeFile);
	console.log(coffeeFileWithDash);
	
	// Files are not required before used
	console.log(multiple);
	
	// Use __requireAll() to require all files
	multiple.__requireAll();
	
	console.log(multiple);
});