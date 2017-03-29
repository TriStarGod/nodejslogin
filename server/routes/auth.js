const express=require("express");
const validator=require("validator");
const passport=require("passport");
const router=new express.Router();

/**
 * Validate the sign up form
 * 
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload){
	const errors={};
	let isFormValid=true;
	let message="";

	if(!payload || payload.email === "undefined" || typeof payload.email !== "string" || !validator.isEmail(payload.email)){
		isFormValid=false;
		errors.email="Please provide a correct email address.";
	}
	if(!payload || payload.password === "undefined" || typeof payload.password !== "string" || payload.password.trim().length < 8){
		isFormValid=false;
		errors.password="Password must have at least 8 characters.";
	}
	if(!payload || payload.name === "undefined" || typeof payload.name !== "string" || payload.name.trim().length < 8){
		isFormValid=false;
		errors.name="Please provide your name.";
	}
	if(!isFormValid){
		message="Check the form for errors.";
	}
	return {
		success:isFormValid,
		message,
		errors
	};
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload){
	const errors={};
	let isFormValid=true;
	let message="";

	if(!payload || payload.email === "undefined" || typeof payload.email !== "string" || !validator.isEmail(payload.email)){
		isFormValid=false;
		errors.email="Please provide a correct email address.";
	}
	if(!payload || payload.password === "undefined" || typeof payload.password !== "string" || payload.password.trim().length < 8){
		isFormValid=false;
		errors.password="Password must have at least 8 characters.";
	}
	if(!isFormValid){
		message="Check the form for errors.";
	}
	return {
		success:isFormValid,
		message,
		errors
	}
}
router.post("/signup", (req,res,next)=>{
	const validationResult=validateSignupForm(req.body);
	if(!validationResult.success){
		return res.status(400).json({
			success:false,
			message:validationResult.message,
			errors:validationResult.errors
		});
	}
	return passport.authenticate("local-signup",(err)=>{
		if(err){
			if(err.name==="MongoError" && err.code===110000){
				return res.status(409).json({
					success:false,
					message:"Check the form for errors.",
					errors:{
						email:"This email is already taken."
					}
				});
			}
			return res.status(400).json({
				success:false,
				message:"Could not process the form."
			});
		}
		return res.status(200).json({
			success:true,
			message:"You have successfully signed up! Now you should be able to log in."
		});
	}) (req,res,next);
	//return res.status(200).end();
});
router.post("/login", (req,res,next)=>{
	const validationResult=validateLoginForm(req.body);
	if(!validationResult.success){
		return res.status(400).json({
			success:false,
			message:validationResult.message,
			errors:validationResult.errors
		});
	}
	return passport.authenticate("local-login",(err,token,userData)=>{
		if(err){
			if(err.name==="IncorrectCrentialsError"){
				return res.status(400).json({
					success:false,
					message:err.message
				});
			}
			return res.status(400).json({
				success:false,
				message:"Could not process the form."
			});
		}
		return res.json({
			success:true,
			message:"You have successfully logged in!",
			token,
			user:userData
		});
	})(req,res,next);
	//return res.status(200).end();
});

module.exports=router;