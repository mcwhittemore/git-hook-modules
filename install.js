var path = require("path");
var init = require("./cmds/init.js");

if(process.env.npm_config_global!=='true'){
	var repo = path.join(process.cwd(), '../..');
	init(repo, function(err){
		if(err){
			console.log(err);
			process.exit(1);
		}
	});
}