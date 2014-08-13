var exec = require("child_process").exec;

var tmp = require("tmp");
tmp.setGracefulCleanup();

var fs = require("fs");
var path = require("path");

var hooksInit = require("../cmds/init");

var HOOK_CMD = "node "+path.join(__dirname, "../bin/git-hooks run");

module.exports = function(cb){

	tmp.dir({unsafeCleanup:true}, function(err, path){
		if(err){
			cb(err);
		}
		else{
			var api = {
				path: path,
				git: {},
				hooks: {}
			}

			var fns = Object.keys(rawApi);

			for(var i=0; i<fns.length; i++){
				api[fns[i]] = rawApi[fns[i]].bind(api);
			}

			var git = Object.keys(gitApi);
			for(var i=0; i<git.length; i++){
				api.git[git[i]] = gitApi[git[i]].bind(api);
			}

			var hooks = Object.keys(hooksApi);
			for(var i=0; i<hooks.length; i++){
				api.hooks[hooks[i]] = hooksApi[hooks[i]].bind(api);
			}

			api.hooks.init.cmd = HOOK_CMD;

			cb(null, api);
		}
	});

}

var rawApi = {
	run: function(cmd, cb){
		exec("cd "+this.path+" && "+cmd, function(err, stdout, stderr){
			// console.log("--->", cmd);
			// console.log(stdout);
			// console.log(stderr);
			// console.log("<---");
			cb(err, stdout, stderr);
		});
	},
	addHookfile: function(cb){
		var HookfilePath = path.join(__dirname, "./Hookfile");
		var content = fs.readFileSync(HookfilePath);
		this.mkfile("Hookfile", content, cb);
	},
	mkfile: function(name, content, cb){
		this.run("echo '"+content+"' > "+name, cb);
	},
	mkdir: function(name, cb){
		this.run("mkdir "+name, cb);
	},
	getFileContents: function(file){
		return fs.readFileSync(this.path+"/"+file, {encoding:"utf8"});
	},
	setup: function(git, hooks, file, cb){
		//git: true, git init
		//hooks: true, hooks init
		//file: true, add Hookfile before hooks init
		var loop = function(){
			if(git){
				git = false;
				this.git.init(next);
			}
			else if(file){
				file = false;
				this.addHookfile(next);
			}
			else if(hooks){
				hooks = false;
				this.hooks.init(next);
			}
			else{
				cb();
			}
		}.bind(this);

		loop();

		function next(err){
			if(err){
				cb(err);
			}
			else{
				loop();
			}
		}
	}
}

var hooksApi = {
	init: function(cb){
		hooksInit(this.path, HOOK_CMD, cb);
	}
}

var gitApi = {
	init: function(cb){
		this.run("git init", cb);
	},
	add: function(path, cb){
		this.run("git add "+path, cb);
	},
	commit: function(end, cb){
		this.run("git commit "+end, cb);
	},
	checkout: function(end, cb){
		this.run("git checkout "+end, cb);
	},
	rebase: function(end, cb){
		this.run("git rebase "+end, cb);
	},
	__makeAddAndCommitFile: function(name, content, cb){
		var git = this.git;
		this.mkfile(name, content, function(err){
			if(err){
				cb(err);
			}
			else{
				git.add(".", function(err){
					if(err){
						cb(err);
					}
					else{
						git.commit("-m 'in-test'", function(err){
							cb(err);
						});
					}
				});
			}
		});
	},
	__setupBranch: function(name, cb){
		var self = this;
		self.git.checkout("-b "+name, function(err){
			if(err){
				cb(err);
			}
			else{
				self.git.__makeAddAndCommitFile("in-"+name, "for "+name, cb);
			}
		});
	},
	__setupBranches: function(branches, cb){
		var self = this;
		loop(0);
		function loop(i){
			if(i==branches.length){
				cb();
			}
			else{
				self.git.__setupBranch(branches[i], function(err){
					if(err){
						cb(err);
					}
					else{
						loop(i+1);
					}
				});
			}
		}
	}
}
