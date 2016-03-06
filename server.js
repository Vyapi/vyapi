var express = require('express');
var app = express();
var path = require('path');
var gmailConf = require('./credentials.js');

app.set('port', (process.env.PORT || 5001));
app.use(express.static(__dirname+'/dist'));

console.log(gmailConf.GMAIL_USERNAME);
console.log(gmailConf.GMAIL_PASSWORD);
console.log(gmailConf.GMAIL_FROM);
console.log(gmailConf.GMAIL_HOST);

//send email
app.get('/emailWrite', function(req, res) {

  var nodemailer = require('nodemailer');

  var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: gmailConf.GMAIL_USERNAME,
        pass: gmailConf.GMAIL_PASSWORD
    }
  };

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(poolConfig);

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: gmailConf.GMAIL_FROM, // sender address
      to: req.query.to, // list of receivers
      subject: req.query.subject, // Subject line
      generateTextFromHTML: true,
      html: req.query.text, // html body
      //text: req.query.text, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error) {
          res.status(500).send(error);
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.status(200).send('done');
  });
});

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname,'/dist/') });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});