var fs = require("fs");
var exec = require("child_process").exec;
var path = require("path");
var possibleHooks = require("../lib/possible-hooks");

module.exports = function(repo, cmd, cb){
	hasDotGit(repo, cb, function(){
		hasDotGitHooks(repo, cb, function(){
			hasInstallGitHooks(repo, cb, function(){
				setupHooks(repo, cmd, cb, function(){
					checkHookfile(repo, cb, function(isNotCreated){
						if(isNotCreated){
							copyHookfile(repo, cb, function(){
								cb();
							});
						}
						else{
							cb();
						}
					});
				});
			});
		});
	});
}

function isPathThere(path, onError, onNext){
	exec("cat "+path, function(err, stdout, stderr){
		var isNotADirectory = stderr.indexOf(": Is a directory")===-1;
		var fileIsMissing = stderr.indexOf("No such file or directory")!==-1;
		if(err && isNotADirectory && fileIsMissing===false){
			onError(err);
		}
		else{
			onNext(!fileIsMissing);
		}
	});
}

function hasDotGit(repo, onError, onNext){
	isPathThere(repo+"/.git", onError, function(isThere){
		if(isThere){
			onNext();
		}
		else{
			onError(new Error("Git must be initialized"));
		}
	})
}

function hasDotGitHooks(repo, onError, onNext){
	isPathThere(repo+"/.git/hooks", onError, function(isThere){
		if(isThere){
			onNext();
		}
		else{
			onError(new Error("Git must be initialized"));
		}
	});
}

function hasInstallGitHooks(repo, onError, onNext){
	var reviewed = 0;
	var error = null;
	possibleHooks.forEach(function(hook){
		isPathThere(repo+"/.git/hooks/"+hook, function(err){
			error = err;
			done();
		}, function(yep){
			if(yep && error === null){
				console.log("Found hook:", hook);
				error = new Error("You must not have custom git hooks before installing or this will override them");
			}
			done();
		});
	});

	function done(){
		reviewed++;
		if(reviewed == possibleHooks.length){
			if(error!==null){
				onError(error);
			}
			else{
				onNext();
			}
		}
	}
}

function setupHooks(repo, cmd, onError, onNext){
	//var cmd = "echo";

	var cnt = 0;
	var error = undefined;
	possibleHooks.forEach(function(hook){
		var filePath = path.join(repo, ".git/hooks", hook);
		var content = cmd+" "+hook;
		setupHook(filePath, content, function(err){
			cnt++;
			error = error || err;
			if(cnt==possibleHooks.length){
				if(error){
					onError(error);
				}
				else{
					onNext();
				}
			}
		});
	});
}

function setupHook(filePath, content, cb){
	fs.writeFile(filePath, content, {encoding:"utf8"}, function(err){
		if(err){
			cb(err);
		}
		else{
			exec("chmod +x "+filePath, cb);
		}
	});
}

function checkHookfile(repo, onError, onNext){
	isPathThere(repo+"/.githooks", onError, function(yep){
		onNext(!yep);
	});
}

function copyHookfile(repo, onError, onNext){
	var baseFile = path.join(__dirname, "../base-files/.githooks");
	var repoFile = path.join(repo, ".githooks");
	exec("cp "+baseFile+" "+repoFile, function(err, stdout, stderr){
		if(err){
			onError(err);
		}
		else{
			onNext();
		}
	});
}
