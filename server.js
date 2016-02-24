var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname+'/dist'));

app.all('/*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname,'/dist/') });
    console.log("dir function ran"+__dirname+'/dist');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
