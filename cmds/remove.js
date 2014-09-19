var parseHookfile = require("../lib/parse-hookfile");

module.exports = function(hook, id){
	var parsed = parseHookfile(process.cwd());
	var commands = parsed[hook] || [];

	if(commands.length-1 < id){
		console.error("Invalid ID. Run `git hooks list "+hook+"` to print out current ids");
	}
	else{
		
	}
}