import React, {PropTypes} from "react";
import Auth from "../modules/Auth"
import LoginForm from "../components/LoginForm.jsx";

class LoginPage extends React.Component {
	//Constructor
	//props and context are called in constructor since programmer wants to use it
	//For props and context to work, submit them to super or else super will "undefine" values
	//super - Looks like its used to p/reset the variables of the object
	constructor(props,context){
		super(props,context);
		const storedMessage=localStorage.getItem("successMessage");
		let successMessage="";
		if(storedMessage){
			successMessage=storedMessage;
			localStorage.removeItem("successMessage");
		}
		//initialize state
		this.state={
			errors:{},
			successMessage,
			user:{
				email:"",
				password:""
			}
		};
		this.processForm=this.processForm.bind(this);
		this.changeUser=this.changeUser.bind(this);
	}
   /**
    * Process the form.
    *
    * @param {object} event - the JavaScript event object
    */
	processForm(event){
		//prevent default event action
		event.preventDefault();

		// //Test
		// console.log("email:", this.state.user.email);
		// console.log("password:", this.state.user.password);
		//Test: email: df...@gmail.com password: test1234
		const email=encodeURIComponent(this.state.user.email);
		const password=encodeURIComponent(this.state.user.password);
		const formData=`email=${email}&password=${password}`
		const xhr=new XMLHttpRequest();
		xhr.open("post","/auth/login");
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.responseType="json";
		//waits for response from server
		xhr.addEventListener("load",()=>{
			if(xhr.status===200){
				//success
				//clear errors
				this.setState({
					errors:{}
				});
				//Save token
				Auth.authenticateUser(xhr.response.token);
				//console.log("The form is valid");
				// redirect to /
				this.context.router.replace("/");
			} else {
				//failure
				//update components with errors
				const errors=xhr.response.errors ? xhr.response.errors : {};
				errors.summary=xhr.response.message;
				this.setState({
					errors
				});
				//console.log(errors);
			}
		});
		//send data to server
		xhr.send(formData);
	}
	/**
	 * Change the user object.
	 *
	 * @param {object} event - the JavaScript event object
	 */
	changeUser(event){
		const field=event.target.name;
		const user=this.state.user;
		user[field]=event.target.value;
		this.setState({
			user
		});
	}
	render(){
		return (
			<LoginForm
				onSubmit={this.processForm}
				onChange={this.changeUser}
				errors={this.state.errors}
				user={this.state.user}
				successMessage={this.state.successMessage}
			/>
		);
	}
}
LoginPage.contextTypes={
	router:PropTypes.object.isRequired
};
export default LoginPage;