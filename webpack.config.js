const path = require("path");
module.exports={
	devtool:"cheap-eval-source-map",
	context:path.join(__dirname,"client/src"),
	//entry file for bundle
	entry:{
		app:path.join(__dirname,"client/src/app.jsx")
	},
	//output bundle file
	output:{
		filename:"[name].bundle.js",
		path:path.join(__dirname,"client/dist/js"),
		publicPath:"/js/"
	},
	module:{
		rules:[
			{
				test:/.jsx?$/,				
				use:["react-hot-loader", "babel-loader"],
				include:path.join(__dirname,"client/src"),
				// publicPath:"/js/"
			},
			// {
			// 	test:/\.css$/,
			// 	use:"file-loader",
			// 	include:path.join(__dirname,"client/static"),
			// 	// publicPath:"/cssw.css"
			// },
			// {
			// 	test:/\.html$/,
			// 	use:"file-loader",
			// 	include:path.join(__dirname,"client/static"),
			// 	// publicPath:"/"
			// }
		]
	}
	,
    devServer:{
        // port:4000,
        // host:"localhost",
		contentBase: "client/dist",
        historyApiFallback: true,
		proxy: {
			"/auth":{
				target:{
					host:"localhost",
					protocol:"http",
					port:"4000"
				}
			},
			"/api":{
				target:{
					host:"localhost",
					protocol:"http",
					port:"4000"
				}
			}
		}
		// filename:"[name].bundle.js",
		// publicPath:"/js/"
    }
};