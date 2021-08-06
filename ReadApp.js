<!-- wp:syntaxhighlighter/code {"language":"jscript"} -->

// Read functions

const express = require('express'); 
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server

 
var env = process.env.NODE_ENV || 'development';
var sqlConfig = require('./config')[env];
 
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
 
app.get('/', function(req, res) {
    res.json({"message": "Welcome to sample API call from Microsoft MSSQL Database."});
});
 
app.get('/Database/ID/:ddid/', function(req, res) {
  connection.connect().then(pool => { 
    var conn=pool.request()
    var forInteger = /\b\d+\b/i; 
    if (forInteger.test(req.params.ddid)) {  
		conn.input('input_parameter', sql.Int, req.params.ddid)} // integer input
    else {conn.input('input_parameter', sql.Int, 32116)} 
    var string = 'select  * from AdventureWorks.Sales.Customer where ddid = @input_parameter'
    return conn.query(string)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(rows);
    connection.close();
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      message: err
    })
    connection.close();
  });
});
 
 
 