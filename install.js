var path = require("path");
var init = require("./cmds/init.js");

var isLink = JSON.parse(process.env.npm_config_argv).original.indexOf("link") !== -1;
var isGlobal = process.env.npm_config_global == 'true';

var isLocal = !isLink && !isGlobal;

var pathParts = process.cwd().split("/");

var isSelf = pathParts[pathParts.length-2] == "node_modules" ? false : true;

if(isLocal){
	var repo = isSelf ? process.cwd() : path.join(process.cwd(), '../..');

	var cmd = isSelf ? "node ./bin/git-hooks run" : "node ./node_modules/git-hook-modules/bin/git-hooks run";

	init(repo, cmd, function(err){
		if(err){
			console.log(err);
			process.exit(1);
		}
	});
}