nodular
=======

A dependency injection autoloader inspired by Angular.

Example:
````javascript
require('nodular')(require)(function(
  error
, $express
, $expressResource
, config
, middlewares
) {
	// Your code here
});
```