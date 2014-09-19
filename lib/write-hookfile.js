var fs = require('fs');
var path = require('path');
var possibleHooks = require("../lib/possible-hooks");

module.exports = function(repo, hookfile) {
	var text = possibleHooks.map(function(hook) {
		var retval = hook + ":\n";
		if(hookfile[hook].length) {
			retval = retval + hookfile[hook].map(function(command) {
				return "\t" + command;
			}).reduce(function(a, b) {
				return a + "\n" + b;
			});
		}
		return retval;
	}).reduce(function(a, b) {
		return a + "\n\n" + b;
	}) + "\n\n";
	var hookfilePath = path.join(repo, ".githooks");
	fs.writeFileSync(hookfilePath, text, {encoding: "utf8"});
};