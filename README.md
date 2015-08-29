## Basic Chess Timer Utilizing ES6 Classes and React Components
---

- Browserify is utilized to bundle all of the necessary React dependencies and ES6 classes into a bundle.js file located at `dist/bundle.js`.
- Gulp is utilized to kick off Browserify, pipe the results to 'dist/bundle.js', and includes a `gulp watch` command to automatically perform the build process when 'index.js', or files in './imports' are modified.
- Run `npm install` in the directory to install dependencies from npm. 
- Then run: `gulp` which will trigger an initial build and wait for outstanding changes.
- Host the directory using whatever method you like