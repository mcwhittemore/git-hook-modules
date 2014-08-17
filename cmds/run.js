var exec = require("child_process").exec;
var parseHookfile = require("../lib/parse-hookfile");

module.exports = function(hook, args){
	var parsed = parseHookfile(process.cwd());
	var commands = parsed[hook] || [];
	runCommands(commands, 0);
}

function runCommands(commands, i){
	if(i<commands.length){
		var cmd = commands[i];
		runCommand(cmd, function(err){
			if(err){
				console.log(cmd);
				throw err;
			}
			else{
				runCommands(commands, i+1);
			}
		});
	}
}

function runCommand(cmd, cb){
	exec("cd "+process.cwd()+" && "+cmd, function(err, stdout){
		if(err){
			cb(err);
		}
		else{
			console.log(stdout);
			cb();
		}
	});
}