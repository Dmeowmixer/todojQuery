var express = require('express');
var app = express();
var bodyParser = require("body-parser")
app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
app.use(bodyParser.urlencoded({ extended: true }));

app.post ('/save', function (req,res){
  console.log(req.body);
  res.send("ok");
});
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
// var fs = require('fs');
// fs.writeFile('/public/index.html', 'Hello Wurld?', function(err){
//   if(err) return console.log(err);
//   console.log('Hello World > index.html');
// });