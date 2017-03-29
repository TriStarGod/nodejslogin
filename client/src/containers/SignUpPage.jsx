import React, {PropTypes} from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

class SignUpPage extends React.Component {
	//Constructor
	//props and context are called in constructor since programmer wants to use it
	//For props and context to work, submit them to super or else super will "undefine" values
	//super - Looks like its used to p/reset the variables of the object
	constructor(props,context){
		super(props,context);
		//initialize state
		this.state={
			errors:{},
			user:{
				email:"",
				name:"",
				password:""
			}
		};
		this.processForm=this.processForm.bind(this);
		this.changeUser=this.changeUser.bind(this);
	}
	/**
	 * Update user
	 * 
	 * @param (object) event - the JavaScript event object
	 */
	changeUser(event){
		const field=event.target.name;
		const user=this.state.user;
		user[field]=event.target.value;
		this.setState({
			user
		});
	}
	/**
	 * Process form
	 * 
	 * @param (object) event - the JavaScript event object
	 */
	processForm(event){
		//prevent default event action (ie. form submission)
		event.preventDefault();
		//Output
		
		// //Test
		// console.log("name:",this.state.user.name);
		// console.log("email:",this.state.user.email);
		// console.log("password:",this.state.user.password);

		const name=encodeURIComponent(this.state.user.name);
		const email=encodeURIComponent(this.state.user.email);
		const password=encodeURIComponent(this.state.user.password);
		const formData=`name=${name}&email=${email}&password=${password}`;
		//AJAX request
		const xhr=new XMLHttpRequest();
		xhr.open("post","/auth/signup");
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
				//set message
				localStorage.setItem("successMessage",xhr.response.message);
				//make a redirect
				this.context.router.replace("/login");
				//console.log("The form is valid");
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
	render(){
		return(
			<SignUpForm 
				onSubmit={this.processForm}
				onChange={this.changeUser}
				errors={this.state.errors}
				user={this.state.user}
			/>
		);
	}
}
SignUpPage.contextTypes={
	router:PropTypes.object.isRequired
};
export default SignUpPage;