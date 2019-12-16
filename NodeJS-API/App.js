var express = require('express'); // Web Framework
var app = express();
var GetData=require('./Controllers/GetData'); //load controller on api start

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Methods", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function () {
    GetData(app);
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
});