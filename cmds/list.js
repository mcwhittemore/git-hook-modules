var exec = require("child_process").exec;
var parseHookfile = require("../lib/parse-hookfile");

module.exports = function(hook, args){
	var parsed = parseHookfile(process.cwd());
	var commands = parsed[hook] || [];
	listCommands(commands, 0);
}

function listCommands(commands, i){
	if(i<commands.length){
		var cmd = commands[i];
		listCommand(cmd, function(err){
			if(err){
				throw err;
			}
			else{
				listCommands(commands, i+1);
			}
		});
	}
}

function listCommand(cmd, cb){
	exec("echo "+cmd, function(err, stdout){
		if(err){
			cb(err);
		}
		else{
			console.log(stdout);
			cb();
		}
	});
}
