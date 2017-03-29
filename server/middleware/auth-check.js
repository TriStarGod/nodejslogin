const jwt=require("jsonwebtoken");
const User=require("mongoose").model("User");
const config=require("../../config");

/**
 * The Auth Checker middleware function
 * req=request
 * res=response
 * next=next function to perform
 */
module.exports=(req,res,next)=>{
	if(!req.headers.authorization) return res.status(401).end();
	//last part from a authorization header string like "bearer token-value"
	const token=req.headers.authorization.split(" ")[1];
	//decode the token using a secret key-phrase
	return jwt.verify(token,config.jwtSecret,(err,decoded)=>{
		//401 code is for unauthorized status
		if(err) return res.status(401).end();
		const userId=decoded.sub;
		//check if user exists
		return User.findById(userId,(userErr,user)=>{
			if(userErr||!user) return res.status(401).end();
			return next();
		});
	});
};