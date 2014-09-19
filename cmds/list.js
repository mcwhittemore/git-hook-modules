var parseHookfile = require("../lib/parse-hookfile");

module.exports = function(hook, args){
	var parsed = parseHookfile(process.cwd());
	var commands = parsed[hook] || [];

	for(var i=0; i<commands.length; i++){
		console.log(i+")", commands[i]);
	}

}