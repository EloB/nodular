nodular
=======

A dependency injection autoloader inspired by Angular.

See example below:
````javascript
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
