var express = require('express');
var app = express();
var bodyParser = require( "body-parser")
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;// Note the db name todosdb in the connection string
var ObjectID = mongodb.ObjectID;
var MongoConnectURL = 'mongodb://localhost:27017/todosdb';
var fs = require('fs');



app.use(express.static('public'));
// this uses bodyParser middle ware to parse the post request and populate req.body
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req,res){
//   res.send('hello.world!');
// });
var server = app.listen(3000, function (){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port)
});

app.post('/item',function (req, res){
  // Note the db name todosdb in the connection string
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }
    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert({
      title: req.body.new_item.title,
      completed: req.body.new_item.completed
    }, function(err, arrayItem) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      res.send(arrayItem[0]._id);


      // Locate all the entries using find
      // collection.find().toArray(function(err, results) {
      //   console.log(results);

        // Close the db connection
        db.close();
      // });
    }); // End of function(err, docs) callback
  });
  // console.log( req.body );
  // res.send('puppies');

  fs.writeFile('./public/todo.txt', req.body.list_to_save, function (err){
    if (err) return console.log(err);
  })

});

app.get('/items',function (req, res){
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }
    var collection = db.collection('todos');
    collection.find().toArray(function(err, docs){
      if(err) {
        throw err;
      }
      res.send(docs);
    });
  });
});

app.delete('/items/:item_id', function (req, res){
  console.log(req.params.id)
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }
    connect_to_db( function ( collection ) {
      var _id = req.params.item_id;
      collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
        if( err ){
          throw err;
        }
        res.json({ success : "success" });
        collection.db.close();
      })
    })
  })
})



//     connect_to_db( function ( collection ) {

//     var _id = req.params.item_id;

//     collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
//       if( err ) throw err;
      
//       res.json({ success : "success" });

//       collection.db.close();
//       });



// // // gEt/ items  list
// // app.get(function ( req, res){ 

// // function connect_to_db ( cb ) {

// //   var new_todo_item_to_be_inserted = req.body.new_item;
// //   collection.insert( new_todo_item_to_be_inserted, function(err,obj){
// //     res.json({success:true});
// //   })
// //     // Note the db name todosdb in the connection string
// //     MongoClient.connect(MongoConnectURL, function(err, db) {
// //     if (err) {
// //       throw err;
// //     }

// //     // Find the collection todos (or create it if it doesn't already exist)
// //     var collection = db.collection('todos');

// //     cb( collection );

// //   });
// // };


// // });




// // // create Post / items

// // app.post('/items',function(req,res){

// // })






// // UPdate  completed PUT items id//status
//  // start of original
// app.post('/items', function(req, res){

// })


// app.delete('/items/')



// function connect_to_db ( cb ) {

//     // Note the db name todosdb in the connection string
//     MongoClient.connect(MongoConnectURL, function(err, db) {
//     if (err) {
//       throw err;
//     }

//     // Find the collection todos (or create it if it doesn't already exist)
//     var collection = db.collection('todos');

//     cb( collection );

//   });
// };


// app.post('/item', function (req,res){
//   // MongoClient.connect(MongoConnectURL, function(err, db) {
//   //     if (err) {
//   //     throw err;
//   //   }

//     // Find the collection todos (or create it if it doesn't already exist)
//     // var collection = db.collection('todos');
//   connect_to_db(function(collection){

//     // Insert a document into the collection
//     collection.insert(req.body.new_item, function(err, arrayItem) {
//       // Show the item that was just inserted; contains the _id field
//       // Note that it is an array containing a single object
//       console.log(arrayItem);
//       res.send(arrayItem[0]._id);
//       // Log the number of items in the collection
//       collection.count(function(err, count) {
//         console.log("count = " + count);
//       });

//       // Locate all the entries using find
//       collection.find().toArray(function(err, results) {
//         console.log(results);

//         // Close the db connection
//         db.close();
//       });
//     }); // End of function(err, docs) callback
//   });
// });

//   app.delete('/items/:item_id', function (req, res) {

//     connect_to_db( function ( collection ) {

//     var _id = req.params.item_id;

//     collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
//       if( err ) throw err;
      
//       res.json({ success : "success" });

//       collection.db.close();
//       });
//     });
//   });
// var server = app.listen(3000, function () {

//   var host = server.address().address
//   var port = server.address().port


// })
// app.get('/items',function(req,res){
//   MongoClient.connect(MongoConnectURL, function(err, db) {
//     if (err) {
//       throw err;
//     }
//     var collection = db.collection('todos');
//     collection.find().toArray(function(err, docs){
//       if(err) {
//         throw err;
//       }
//       res.send(docs);
//      });
//   });
// })
// //end of original   


