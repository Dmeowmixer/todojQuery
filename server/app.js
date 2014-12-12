var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
app.use(bodyParser.urlencoded({ extended: true }));

app.post ('/save', function (req,res){
  console.log(req.body);
  saveTodoList(req.body.list_to_save);
  res.send("ok");
});
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
function saveTodoList(content){
  fs.writeFile('./public/todo.txt',content, function(err){
    if(err) return console.log(err);
    console.log('successfully saved todo_save.json yo');
  });
}