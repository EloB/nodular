nodular
=======

A dependency injection autoloader inspired by Angular.

Installation
------

```
$ npm install nodular
```

Quick Start
------

Nodular is a dependency injection autoloader for Node. If you look at the example below you can see that it lacks the `require` method for each module loading instead nodular will take care of all requirements.

When you enter an argument, then nodular automatically require that file or folder for you. If the folder does not contain an index file then it will instead return an object with all the files.

If you are in the beginning of an argument name states `$`, it will then be loaded from that projects "node_modules" folder.

Because it's impossible to have dash in argument names you will have to use camelCase to emulate a dash in module, file or folder name.

```javascript
require('nodular')(require, function(
  error
, $express
, $expressResource
, config
, middlewares
) {
    var app = module.exports = $express();
    
    app.use($express.static('public'));
    app.use(middlewares.passport());
    app.use(middlewares.rest());
});
```

A simple project and example
------

- **project_folder/**
    - **config/**
        - redis.json
        - mongo.json
    - **middlewares/**
        - **rest/**
            - **resources/**
                - users.js
                - threads.js
                - posts.js
                - comments.js
            - index.js
        - passport.js
    - **node_modules/**
        - **express/**
            - (All files)
        - **express-resources/**
            - *(All files)*
        - **passport/**
            - *(All files)*
        - **passport-local/**
            - *(All files)*
    - app.js

TODO: Write more on example.

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