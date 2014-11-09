var bodyParser = require('body-parser');
var express = require('express');
app = express();
app.use(bodyParser.json());
app.use( express.static(__dirname));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
    });

app.listen(8081);

 app.post("/", function(req,res){
    // console.log(JSON.stringify(req));
    console.log(req);
    console.log("test");
    res.send("allgood");
 });