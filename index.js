// const express = require("express");
// const app = express();
// //set static
// app.use(express.static("./server/static/"));
// app.use(express.static("./client/dist/"));
// //start server
// app.listen(3000, () => {
// 	console.log("server is running on http://localhost:3000");
// });

const express=require("express");
const bodyParser=require("body-parser");
const passport=require("passport");
const config=require("./config/index");

// console.error(config.dbUri);
// const csurf=require("csurf");

//connect to the database and load models
// mongodb://username:password@host/database
require("./server/models/index").connect(config.dbUri);

const app=express();

//static files
//app.use(express.static("./server/static/"));
// app.use(express.static("./client/static/"));
// app.use(express.static("./client/dist/"));
//parse HTTP body messages
app.use(bodyParser.urlencoded({extended:false}));

// //Cross Site Request Forgery Defense - Transparent Tokens - option 3 - token instead of this option; token may be better (ie JWT token)
// app.use(csurf());
// app.use("/",function(req,res,next){
// 	res.cookie("XSRF-TOKEN",req,csurfToken());
// 	next();
// });

//pass the passport middleware
app.use(passport.initialize());
//load passport strategies
passport.use("local-signup",require("./server/passport/local-signup"));
passport.use("local-login",require("./server/passport/local-login"));
//pass the auth checker middleware
app.use("/api",require("./server/middleware/auth-check"));
//routes
app.use("/auth",require("./server/routes/auth"));
app.use("/api",require("./server/routes/api"));

//start server
const server = app.listen(4000, ()=>{
	console.log("Server is running on http://%s:%s",
	server.address().address,
	server.address().port);
})