nodular [![Build Status](https://travis-ci.org/EloB/nodular.png?branch=master)](https://travis-ci.org/EloB/nodular) [![Dependency Status](https://gemnasium.com/EloB/nodular.png)](https://gemnasium.com/EloB/nodular)
=======

A dependency injection autoloader inspired by Angular.

Installation
------

```
$ npm install nodular
```

Why i made it?
------

I often have troubles of structuring my projects with seperated files and folders. I also do not like to start all my files with a bunch of requires. Therefore I created nodular that will help you to easily create file structure to any project regardless of framework or modules.

Here you can see an example of a standard "bootstrap" file from a normal size express.js website.

```javascript
// Module dependencies.
var express = require('express');
var expressResource = require('express-resource');
var http = require('http');
var redis = require('redis');
var mongoose = require('mongoose');
var connectAssets = require('connect-assets');
var consolidate = require('consolidate');
var resources = {
	user: require('./resources/user'),
	forum: require('./resources/forum'),
	threads: require('./resources/threads'),
	posts: require('./resources/posts'),
	comments: require('./resources/comments'),
	ads: require('./resources/ads'),
	news: require('./resources/news'),
	pages: require('./resources/pages')
};
var middlewares = {
	session: require('./middlewares/session'),
	passport: require('./middlewares/passport')
};
var routes = require('./routes');
var config = {
	mongodb: require('./config/mongodb'),
	redis: require('./config/redis'),
	passport: require('./config/passport'),
	general: require('./config/general')
};
require('./monkey-patches/something');
require('./monkey-patches/something-else');
require('./mokney-patches/some-more');
```

With nodular the `javascript` will look like this.

```javascript
require('nodular')(require, function(
  err
, $express
, $expressResources
, $http
, $redis
, $mongoose
, $connectAssets
, $consolidate
, resources
, middlewares
, config
, routes
, monkeyPatches
) {
	// You can handle any require errors with the first variable.
	// if(err) throw err;
	
	// If you declared a variable name that represent a folder and it doesn't contain a index file then an object is created with getters for each file.
	// The files wont be required before you used them. If you want all files to be properly required then use the __requireAll() method.
	monkeyPatches.__requireAll()
	
	// You can also require a single file as well by just typing its name like this.
	// monkeyPatches.something;
	// monkeyPatches.someMore;
	
	// You can also easily use the custom require method to include files or folders other than the current working directory.
	// var subPathToFolderOrFile = this.require('./sub-path/to/folder-or-file');
	// var parentPathFolderOrFile = this.require('../parent/path/folder-or-file');
	
	// Your code here
});
```

and in `coffescript` it will looks like this.

```coffeescript
require('nodular') require, (
	err
	$express
	$expressResource
	$http
	$redis
	$mongoose
	$connectAssets
	$consolidate
	resources
	middlewares
	config
	routes
	monkeyPatches
) ->
	do monkeyPatches.__requireAll
	
	# Your code here
```

Quick Start
------

Nodular is a dependency injection autoloader for Node. If you look at the example below you can see that it lacks the `require` method for each module loading instead nodular will take care of all requirements.

When you enter an argument, then nodular automatically require that file or folder for you. If the folder does not contain an index file then it will instead return an object with all the files.

If you are in the beginning of an argument name states `$`, it will then be loaded from that projects `node_modules` folder.

Because it's impossible to have dash in argument names you will have to use camelCase to emulate a dash in module, file or folder name.

Social
------

- Follow [ollebroms](https://twitter.com/ollebroms) on twitter.

License
------

(The MIT License)

Copyright (c) 2013-2013 Olle "EloB" Bröms <olle.broms@ewebbyran.se>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.