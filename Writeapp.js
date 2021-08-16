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


// // for test purposes
// app.get('/insert', function(req,res){
	
// 	var val = req.query.val;
// 	var val2 = req.query.val2;
      
//   console.log("val :", val)
//   console.log("val2 :", val2)
    
// connection.connect(function(err) {
// connection.query("insert into usersad2 (val,val2) values ("+val+","+val2+")",function(err,result){

// if(!!err){
// console.log(err);
// res.send('Error in inserting');
// }
// else{
// connection.query("SELECT * FROM usersAD2", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
//   res.send('Successfully inserted in MSSQLServer Database!');
// }});});


// });



// app.post('/insert/UsersAD', function(req,res){
	
// 	var EmloyeeID = req.query.EmloyeeID;
// 	var SamAccountName = req.query.SamAccountName;
//   var DisplayName = req.query.DisplayName;
//   var Email = req.query.Email;

//   console.log(EmloyeeID);
//   console.log(SamAccount);

    
// connection.connect(function(err) {
// connection.query("INSERT INTO dbo.UsersAD (EmloyeeID, SamAccountName,DisplayName, Email) values ("+EmloyeeID+",'"+SamAccountName+"', '"+DisplayName+"', '"+Email+"')",function(err,result){

// if(!!err){
// console.log(err);
// res.send('Error in inserting');
// }
// else{
//   res.send('Successfully Insertion');
// }});});

// });



app.get('/insert', function(req,res){
	
	var tekst = req.params.tekst;    
  console.log("value for t :", tekst.toString());


  
connection.connect(function(err) {
connection.query("INSERT  INTO TestChar (tekst) values (''"+String(tekst)+"'')",function(err,result){

if(!!err){
console.log(err);
res.send('Error in inserting');
}
else{
connection.query("SELECT * FROM TestChar", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  res.send('Successfully inserted in MSSQLServer Database!');
}});});


});



