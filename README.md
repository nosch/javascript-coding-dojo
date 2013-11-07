# JavaScript Coding Dojo

## What is it?

This a very simple framework for JavaScript Coding Dojo sessions, based on the "Sandbox" pattern. You can perform your exercises, while [JSHint](http://www.jshint.com/) and the test runner [Karma](http://karma-runner.github.io/) (using [Jasmine](http://pivotal.github.io/jasmine/) keep their eyes on your code - with the help of [Grunt](http://gruntjs.com/). In addition, [Plato](https://github.com/es-analysis/plato) analyzes the code complexity and generates reports.

## How to install?

1. Install [node.js and npm](http://nodejs.org/download/ "Download node.js")
2. $ git clone git@github.com:nosch/javascript-coding-dojo.git "javascript-coding-dojo"
3. $ cd javascript-coding-dojo
4. $ npm install (installs grunt, karma and plato)

## How to use?

* $ grunt kata (starts JSHint and a local webserver with livereload)
* $ grunt test (starts Karma to run and watch unit tests)
* $ grunt analyze (generates code complexity reports: reports/index.html)
* Unit tests reside in test/unit/**/*.spec.js
* Katas are located in src/kata/**/*.js
* Happy coding!
