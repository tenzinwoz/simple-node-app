const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');

var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'node-project'
});

con.connect((err) => {
    if(err) throw err;
    else{
        console.log("Database connected")
    }  
 
});

app.get('/', (req,res)=>{
  res.sendFile('index.html', {root: __dirname});
});

app.get('/users', (req,res)=>{

  con.query("SELECT * FROM users", function (err, rows, fields) {
    if (err) throw err
    res.render('users', {title: 'Users Details', users: 'User Informations', items:rows});
    console.log(rows);
  
  });
  
});


app.post('/submit', (req,res)=>{
console.log(req.body);

var sql = "insert into users values(null, '"+req.body.name+"' , '"+req.body.email+"' , '"+req.body.mobile+"' )";
con.query(sql, function (err) {
  if (err) throw err
  res.render('index', {message: 'Data Saved', title: 'post'});
 
});

});


app.listen(3000, (err) => {
    if (err) throw err;
    else{
        console.log("App is running on server 3000");
    }
})
