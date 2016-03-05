var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
});

app.get('/emailSend', function(req, res) {
  res.send('sent');
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})