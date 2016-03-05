var express = require('express');
var app = express();
var path = require('path');
var gmailConf = require('./credentials.js');

app.set('port', (process.env.PORT || 5001));
app.use(express.static(__dirname+'/dist'));

//send email
app.get('/emailWrite', function(req, res) {
  var email   = require("emailjs/email");
  var server  = email.server.connect({
      user:    gmailConf.GMAIL_USERNAME,
      password:gmailConf.GMAIL_PASSWORD,
      host:    gmailConf.GMAIL_HOST,
      ssl:     true
  });

  server.send({
    text:    req.query.text,
    from:    gmailConf.GMAIL_FROM,
    to:      req.query.to,
    subject: req.query.subject
  }, function(err, message) {
    if(err != null)
      console.log(err); //console.log(message); //message which got sent to SMTP
  })
  console.log('email process complete');

  res.status(200).send('done');
});

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname,'/dist/') });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});