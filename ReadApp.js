// Read functions
const express = require('express'); 
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server
var beautify = require("json-beautify");
 
var env = process.env.NODE_ENV || 'production';
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
 
// Input as Integer
app.get('/UsersAD/EmloyeeID/:empID/', function(req, res) {
  connection.connect().then(pool => { 
    var conn=pool.request()
    var forInteger = /\b\d+\b/i; 
    if (forInteger.test(req.params.empID)) {  
       conn.input('input_parameter', sql.Int, req.params.empID)}
    else {conn.input('input_parameter', sql.Int, 32116)} 
    var string = 'SELECT * FROM dbo.UsersAD WHERE  EmloyeeID  = @input_parameter'
    return conn.query(string)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
	  // Result to URL
   res.status(200).type('JSON').send(beautify(rows, null, 2, 100));
		
	  // result to log
	  console.log(beautify(rows, null, 2, 100));
    connection.close();
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      message: err
    })
    connection.close();
  });
});




 // input as VarChar
 app.get('/UsersAD/SamAccountName/:SamAccountName/', function(req, res) {
  connection.connect().then(pool => { 
    var conn=pool.request()
    conn.input('input_parameter', sql.VarChar, req.params.SamAccountName)
    var string = 'SELECT * FROM dbo.UsersAD WHERE  SamAccountName  = @input_parameter'
    return conn.query(string)
  }).then(result => {
    let rows = result.recordset
    res.setHeader('Access-Control-Allow-Origin', '*')
	
	res.status(200).type('JSON').send(beautify(rows, null, 2, 100));
		
	// result to log
	console.log(beautify(rows, null, 2, 100));
    connection.close();
  }).catch(err => {
    console.log(err);
    res.status(500).send({
      message: err
    })
    connection.close();
  });
});
 
