var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');


var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));

app.get('/',function(req,res){

	res.render("landing");
});

app.listen(3000,function(){
	console.log("server started");
})