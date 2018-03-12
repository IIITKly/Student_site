var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Blog = require("./models/Blog");
var Comments = require("./models/Comment");
var User     = require('./models/User');

var app = express();
var passport =require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://localhost/Student_site');
app.use(express.static(__dirname +"/public"));

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
/*
==================================
Authentication
==================================

*/


app.use(require('express-session')({

	secret:"This sentences is used as encription key",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser= req.user;
	next();
});

/*
=======================================
*/



app.get('/',function(req,res){

	Blog.find({},function(err,body){
		if (err){
			console.log(err);
		}
		else{
			res.render("landing",{blog:body});
		}

	})

});

/*
======================
Login  & Register Routes
======================
*/
//show register form
app.get('/register',function(req,res){
	res.render('User/register');
});

//Handle regiter
app.post('/register',function(req,res){
	
	var temp = req.body.user;
	console.log("=======");
	//console.log(temp);
	var newUser = new User({
		username : temp.username,
		first_name :temp.first_name,
		last_name : temp.last_name,
		email :temp.email
	});
	//console.log(newUser);
	User.register(newUser,temp.password,function(err,user){
		if (err){
			console.log(err);
			console.log(user);
			return res.redirect('/register');
		}
		console.log(user);
		passport.authenticate('local')(req,res,function(){
					console.log(req.currentUser);
					res.redirect('/');
			})

		})
	

	
});




app.get('/login',function(req,res){
	
		res.render('User/login');
	
});


app.post('/login',
	passport.authenticate('local',{
		successRedirect : '/',
		failureRedirect : 'back'
	}),
	function (req,res){

});




/*
=====================
Blog Route
=====================
*/
//New route


app.get('/blog/new',function(req,res){
	res.render('Blog/new');
})


//Create route
app.post('/blog',function(req,res){
	Blog.create(req.body.blog,function(err,body){
		if (err){
			console.log(err);
		}
		else{
			res.redirect('/');
		}
	})
})




app.listen(3001,function(){
	console.log("server started");
});
