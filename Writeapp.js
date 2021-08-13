// Read functions
const express = require('express'); 
const app = express();
const sql = require('mssql/msnodesqlv8') //mssql with MS driver for SQL Server
var beautify = require("json-beautify");
// npm install url-parse
//var Url = require('url-parse');
 
 
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
//const URL = require("url").URL;

app.get('/insert', function(req,res){
	
	//var url_parts = url.parse(req.url, true);
	//var query = url_parts.query;
	var val = req.query.val;
	var val2 = req.query.val2;

    //var val = req.query.name
      
    console.log("val :", val)
        console.log("val2 :", val2)
    
	
//console.log(val);
//console.log(url_parts);
//console.log(query);


connection.connect(function(err) {
connection.query("insert into usersad2 (val,val2) values ("+val+","+val2+")",function(err,result){

if(!!err){
console.log(err);
res.send('Error in inserting');
}
else{
connection.query("SELECT * FROM usersAD2", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  res.send('Successfully Insertion');
}});});


});