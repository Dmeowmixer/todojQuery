var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;// Note the db name todosdb in the connection string


app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })
app.use(bodyParser.urlencoded({ extended: true }));

app.post ('/item', function (req,res){
  // console.log(req.body);
  // saveTodoList(req.body.list_to_save);
  // res.send("ok");
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
      if (err) {
      throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert(req.body.new_item, function(err, arrayItem) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      console.log(arrayItem);
      res.send(arrayItem[0]._id);
      // Log the number of items in the collection
      collection.count(function(err, count) {
        console.log("count = " + count);
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.log(results);

        // Close the db connection
        db.close();
      });
    }); // End of function(err, docs) callback
  });
});
var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
// function saveTodoList(content){
//   fs.writeFile('./public/todo.txt',content, function(err){
//     if(err) return console.log(err);
//     console.log('successfully saved todo_save.json yo');
//   });
// }
app.get('/items',function(req,res){
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }
    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');
    collection.find().toArray(function(err, docs){
      if(err) {
        throw err;
      }
      res.send(docs);
     });
  });
})