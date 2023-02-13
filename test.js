// const express = require('express');
// const app = express();
// app.get('/', function (req, res) {
// const MongoClient = require("mongoose");
//   const url = 'mongodb://127.0.0.1/';
//   const databasename = "nodemongo";  // Database name
//   MongoClient.connect(url).then((client) => {
    
//       const connect = client.db(databasename);
    
//       // Connect to collection
//       const collection = connect
//               .collection("nodemongo");
    
//       // Fetching the records having 
//       // name as saini
//       collection.find({})
//           .toArray().then((ans) => {
//               res.json(ans)
//           });
//   }).catch((err) => {
    
//       // Printing the error message
//       console.log(err.Message);
//   })
// })
//   app.listen(5000, function(){
//     console.log("Server started on localhost:3000");
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const {
  GridFsStorage
} = require("multer-gridfs-storage");
 
require("dotenv")
  .config();
 
const mongouri = 'mongodb+srv://User1:' + process.env.MONGO_PASS + '@cluster0.wakey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
try {
  mongoose.connect(mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
} catch (error) {
  handleError(error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});
 
//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
  console.log(bucket);
});
 
//to parse json content
app.use(express.json());
//to parse body from url
app.use(express.urlencoded({
  extended: false
}));
 
app.listen(process.env.PORT, function () {
  console.log(`Application live on localhost:{process.env.PORT}`);
});