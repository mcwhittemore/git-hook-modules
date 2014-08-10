var exec = require("child_process").exec;
var possibleHooks = require("../lib/possible-hooks");

module.exports = function(repo, cb){
	hasDotGit(repo, cb, function(){
		hasDotGitHooks(repo, cb, function(){
			hasInstallGitHooks(repo, cb, function(){
				copyHooks(repo, cb, function(){
					checkHookfile(repo, cb, function(isNotCreated){
						if(isNotCreated){
							copyHookfile(repo, cb, function(){
								cb();
							});
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
				error = new Error("You must not have custom git hooks before installing or this will override them");
			}
			done();
		})
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

function copyHooks(repo, onError, onNext){
	//TODO: this
}

function checkHookfile(repo, onError, onNext){

}

function copyHookfile(repo, onError, onNext){

}