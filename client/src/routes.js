import Base from "./components/Base.jsx";
import HomePage from "./components/HomePage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx"
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import Auth from "./modules/Auth";

/**
 * - routes all requests
 */
const routes={
	//Base is the base component on which other components display on top of
	component:Base,
	childRoutes:[
		{
			path:"/",
			//component:HomePage
			getComponent:(location,callback)=>{
				if(Auth.isUserAuthenticated()){
					callback(null,DashboardPage);
				} else {
					//callback(null,DashboardPage);
					callback(null,HomePage);
				}
			}
		},
		{
			path:"/login",
			component:LoginPage
		},
		{
			path:"/signup",
			component:SignUpPage
		},
		{
			path:"/logout",
			onEnter:(nextState,replace)=>{
				Auth.deauthenticateUser();
				//change the current URL to /
				replace("/");
			}
		}
	]
};
export default routes;