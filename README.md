# JavaScript Coding Dojo

## What is it?

This a very simple framework for JavaScript Coding Dojo sessions, based on the "Sandbox" pattern. You can perform your exercises, while [JSHint](http://www.jshint.com/) and the test runner [Karma](http://karma-runner.github.io/) keep their eyes on your code - with the help of [Grunt](http://gruntjs.com/).

## How to install?

1. Install [node.js and npm](http://nodejs.org/download/ "Download node.js")
2. $ git clone git@bitbucket.org:nosch/javascript-coding-dojo.git "javascript-coding-dojo"
3. $ cd javascript-coding-dojo
4. $ npm install (installs karma and grunt)

## How to use?

* $ grunt kata (starts JSHint and a local webserver with livereload)
* $ grunt test (starts Karma to run and watch unit tests)
* Unit tests reside in test/unit/**/*.spec.js
* Katas are located in src/kata/**/*.js
* Happy coding!
