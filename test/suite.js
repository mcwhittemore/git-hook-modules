var exec = require("child_process").exec;

var tmp = require("tmp");
tmp.setGracefulCleanup();

var fs = require("fs");
var path = require("path");

var hooksInit = require("../cmds/init");

var HOOK_CMD = "node "+path.join(__dirname, "../bin/git-hook run");

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
	}
}
