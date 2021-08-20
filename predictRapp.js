// Read functions
const express = require('express'); 
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server
var beautify = require("json-beautify");
 
var env = process.env.NODE_ENV || 'production';
var sqlConfig = require('./config')[env];

const path = require('path')


// View Engine Setup
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")
  
 
// Start server and listen on http://localhost:2908/
var server = app.listen(2908, function() {
  var host = server.address().address
  var port = server.address().port
 
  console.log("app listening at http://%s:%s", host, port)
});
 
const connection = new sql.ConnectionPool(sqlConfig, function(err){
      if (err){
      console.log(err);
      }
    }
)

// Sample with parameters for prediction
//Use URL: http://localhost:2908/Predict?Sepal_length=4.45&Sepal_width=2.94&Petal_length=1.34&Petal_width=0.41

// create pool to return the results!!
 app.get('/Predict', function(req,res){

   var Sepal_length = req.query.Sepal_length;
   var Sepal_width = req.query.Sepal_width;
   var Petal_length = req.query.Petal_length;
   var Petal_width = req.query.Petal_width;

   console.log("Value for Sepal_length: ",Sepal_length);
   console.log("Value for Sepal_width: ",Sepal_width);
   console.log("Value for Petal_length: ",Petal_length);
   console.log("Value for Petal_width: ",Petal_width);

  
 connection.connect(function(err) {
 connection.query("EXEC dbo.Predict_iris  @model = 'rxDTree',@q ='SELECT CAST( "+Number(Sepal_length)+" AS DECIMAL(10,2)) AS Sepal_length, CAST("+Number(Sepal_width)+" AS DECIMAL(10,2)) AS Sepal_width, CAST("+Number(Petal_length)+" AS DECIMAL(10,2)) AS Petal_length, CAST("+Number(Petal_width)+" AS DECIMAL(10,2)) AS Petal_width';",function(err,result){

 if(!!err){
 console.log(err);
 res.send('Error in reading');
 }
 else{
   res.status(200).type('JSON').send(beautify(result, null, 2, 100));
   console.log(result);  
 
 }});});

 });



