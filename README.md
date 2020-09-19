# KLIMAX UI Template

-------------------------------------------------------------------------
Prerequisite: node.js installed locally - https://nodejs.org/en/download/
-------------------------------------------------------------------------


To get started, run the following command:

```
npm install
```

To run pre-build production site run following command:

```
gulp server
```
Server runs on http://localhost:8080

To do new production build and run it on server run following command:

```
gulp prod --env production
```
-> then open browser on http://localhost:8080

To do new development build and run it on server run following command:

```
gulp dev --env development
```

Code will contain SCSS sourcemaps; SCSS, HTML, Images and SVG source icons will be watched for changes and re-compiled automatically. Server runs on http://localhost:8080
