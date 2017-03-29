const User=require("mongoose").model("User");
const PassportLocalStrategy=require("passport-local").Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports=new PassportLocalStrategy({
	usernameField:"email",
	passwordField:"password",
	session:false,
	passReqToCallback:true
}, (req,email,password,done)=>{
	const newUser=new User({
		email:email.trim(),
		password:password.trim(),
		name:req.body.name.trim()
	});
	newUser.save((err)=>{
		if(err) return done(err);
		return done(null);
	});
});