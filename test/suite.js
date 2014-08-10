var exec = require("child_process").exec;

var tmp = require("tmp");
tmp.setGracefulCleanup();

var fs = require("fs");

var hooksInit = require("../cmds/init");

module.exports = function(cb){

	tmp.dir({unsafeCleanup:true}, function(err, path){
		if(err){
			cb(err);
		}
		else{
			var api = {
				path: path
			}

			var fns = Object.keys(rawApi);

			for(var i=0; i<fns.length; i++){
				api[fns[i]] = rawApi[fns[i]].bind(api);
			}

			cb(null, api);
		}
	});

}

var rawApi = {
	initGit: function(cb){
		exec("cd "+this.path+ " && git init", function(err, stdout){
			cb(err);
		});
	},
	initHooks: function(cb){
		hooksInit(this.path, cb);
	},
	addHookfile: function(cb){
		exec("touch "+this.path+"/Hookfile", function(err){
			cb(err);
		});
	},
	getFileContents: function(file){
		return fs.readFileSync(this.path+"/"+file, {encoding:"utf8"});
	}
}
