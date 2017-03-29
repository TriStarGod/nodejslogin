import React from "react";
import ReactDOM from "react-dom";

// ReactDOM.render(<h1>Hello from Reactys</h1>, document.getElementById("app"));
// //Above transforms into below
// ReactDOM.render(React.createElement("h1",null,"Hello from React"),document.getElementById("app"));

// import HomePage from "./components/HomePage.jsx"

// ReactDOM.render((
// 	<HomePage />
// ), document.getElementById("app"));

import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {browserHistory,Router} from "react-router";
import routes from "./routes.js";

//remove tap delay - needed for Material ui
injectTapEventPlugin();

ReactDOM.render((
	<MuiThemeProvider muiTheme={getMuiTheme()}>
		<Router history={browserHistory} routes={routes}/>
	</MuiThemeProvider>
), document.getElementById("app"));
