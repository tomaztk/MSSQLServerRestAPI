<!-- wp:syntaxhighlighter/code {"language":"jscript"} -->
<pre class="wp-block-syntaxhighlighter-code">//const http = require('http');

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
 
app.get('/MPIData/ID/:dtid/', function(req, res) {
  connection.connect().then(pool => { //Using a single connection pool is recommended
    var conn=pool.request()
    var forInteger = /\b\d+\b/i; //make sure that there is only an integer.
    if (forInteger.test(req.params.dtid)) {  
       conn.input('input_parameter', sql.Int, req.params.dtid)}
    else {conn.input('input_parameter', sql.Int, 32116)} 
    var string = 'select  dt_id, dt_name, DT_Code, DT_CreationTs from AdventureWorks.[dbo].[Data] where DT_ID = @input_parameter'
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
 
 
app.get('/MPIData/CLID/:dtclid/', function(req, res) {
  connection.connect().then(pool => { //Using a single connection pool is recommended
    var conn=pool.request()
    var forInteger = /\b\d+\b/i; //make sure that there is only an integer.
    if (forInteger.test(req.params.dtclid)) {  
       conn.input('input_parameter', sql.Int, req.params.dtclid)}
    else {conn.input('input_parameter', sql.Int, 32116)} 
    var string = 'select  dt_name, dt_id, dt_cl_id, dt_GG_ID_origin, dt_gg_id_destination ,dt_createdBy, DT_Code, DT_CreationTs from mpi_Storage.[dbo].[Data] where DT_CL_ID = @input_parameter'
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
 
 
 
// app.get('/adventureproc/:customerId/', function(req, res) {
  // connection.connect().then(pool => { //Using a single connection pool is recommended
    // var conn=pool.request()
    // var forInteger = /\b\d+\b/i; //make sure that there is only an integer.
    // if (forInteger.test(req.params.customerId)) { //check whether it was an integer
       // conn.input("BusinessEntityID", sql.Int, req.params.customerId)}
    // else {conn.input("BusinessEntityID", sql.Int, 1)} //otherwise just pass a 1
      // conn.execute("uspGetEmployeeManagers")//the name of the procedure
        // .then(result => {
          // let rows = result.recordset //first recordset
          // res.setHeader('Access-Control-Allow-Origin', '*')
          // res.status(200).json(rows);
          // connection.close();
        // }).catch(err => {
          // console.log(err);
          // res.status(500).send({
            // message: err
          // })
          // connection.close(); //send the connection back to the pool
        // });
    // })
// });</pre>
<!-- /wp:syntaxhighlighter/code -->
