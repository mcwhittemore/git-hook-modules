var possibleHooks = require("../lib/possible-hooks");
var parseHookfile = require("../lib/parse-hookfile");
var writeHookfile = require("../lib/write-hookfile");

module.exports = function(hook, args){
	var parsed = parseHookfile(process.cwd());
	parsed[hook].push(args[0]);
	writeHookfile(process.cwd(), parsed);
};