var fs = require("fs");
var path = require("path");
var possibleHooks = require("./possible-hooks");

module.exports = function(repo){
	var hookfilePath = path.join(repo, "Hookfile");
	var content = fs.readFileSync(hookfilePath, {encoding:"utf8"});

	var listOfCommandsByHookName = {};

	var lines = content.split("\n");
	var isHook = /^[a-zA-Z\-]*:[ ]*$/;
	var isCmd = /^\t[a-zA-Z]/; //this means that command lines must start with a tab and than any alpha charicter

	var currentHook = null;
	for(var i=0; i<lines.length; i++){
		var line = lines[i];
		if(line.match(isHook)){
			var hook = line.split(":")[0];
			if(possibleHooks.indexOf(hook)!==-1){
				currentHook = hook;
				if(listOfCommandsByHookName[hook]===undefined){
					listOfCommandsByHookName[hook] = [];
				}
				else{
					throw new Error("Duplicate Hook in Hookfile ("+hookfilePath+") at Line "+i);
				}
			}
			else{
				throw new Error("Invalid Hook ("+hook+") in Hookfile ("+hookfilePath+") at Line "+i);
			}
		}
		else if(line.match(isCmd)){
			var cmd = line.replace("\t", "");
			if(currentHook){
				listOfCommandsByHookName[hook].push(cmd);
			}
			else{
				throw new Error("Commands must be nested directly under a hook name");
			}
		}
		else{
			currentHook = undefined;
		}
	}

	return listOfCommandsByHookName;
}