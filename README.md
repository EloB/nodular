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

If you are in the beginning of an argument name states "$", it will then be loaded from that projects "node_modules" folder.

See example below:
```javascript
require('nodular')(require)(function(
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
