var connect = require('connect');
var serveStatic = require('serve-static');

var port = 8080;
console.log('listening on port: ' + port);
connect().use(serveStatic(__dirname)).listen(port);