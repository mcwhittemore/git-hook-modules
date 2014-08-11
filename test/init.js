var fs = require("fs");
var path = require("path");

describe("git hooks init", function(){

	describe("should not run when", function(){
		it("there is no .git folder present", function(done){
			TEST_SUITE.hooks.init(function(err){
				try{
					err.should.have.property("message", "Git must be initialized");
					done();
				}
				catch(err){
					done(err);
				}
			});
		});

		it("there is no .git/hooks folder present", function(done){
			TEST_SUITE.mkdir(".git", function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.hooks.init(function(err){
						try{
							err.should.have.property("message", "Git must be initialized");
							done();
						}
						catch(err){
							done(err);
						}
					});
				}
			});
		});
	});

	describe("should run if there is a .git/hooks folder", function(){
		
		describe("and the Hookfile is present it should", function(){
			beforeEach(function(done){
				TEST_SUITE.git.init(function(err){
					if(err){
						done(err);
					}
					else{
						TEST_SUITE.addHookfile(function(err){
							if(err){
								done(err);
							}
							else{
								TEST_SUITE.hooks.init(done);
							}
						});
					}
				});
			});

			it("not create a new Hookfile", function(){
				var liveHook = TEST_SUITE.getFileContents("Hookfile");
				var HookfilePath = path.join(__dirname, "./Hookfile");
				var content = fs.readFileSync(HookfilePath,{encoding:"utf8"});
				liveHook.should.equal(content+"\n");
			});
		});

		describe("and the Hookfile is NOT present it should", function(){

			beforeEach(function(done){
				TEST_SUITE.git.init(function(err){
					if(err){
						done(err);
					}
					else{
						TEST_SUITE.hooks.init(done);
					}
				});
			});

			var possibleHooks = require("../lib/possible-hooks");

			it("create a Hookfile", function(){
				var repoFileContent = TEST_SUITE.getFileContents("Hookfile");

				var baseFile = path.join(__dirname, "../base-files/Hookfile");
				var baseFileContent = fs.readFileSync(baseFile, {encoding:"utf8"});

				repoFileContent.should.equal(baseFileContent);
			});

			var checkHook = function(hook){
				
				var repoFileName = ".git/hooks/"+hook;
				var repoFileContent = TEST_SUITE.getFileContents(repoFileName);
				
				var cmd = TEST_SUITE.hooks.init.cmd+" "+hook;

				repoFileContent.should.equal(cmd);

			}

			it("setup the applypatch-msg hook", function(){
				checkHook("applypatch-msg");
			});
			it("setup the pre-applypatch hook", function(){
				checkHook("pre-applypatch");
			});
			it("setup the post-applypatch hook", function(){
				checkHook("post-applypatch");
			});
			it("setup the pre-commit hook", function(){
				checkHook("pre-commit");
			});
			it("setup the prepare-commit-msg hook", function(){
				checkHook("prepare-commit-msg");
			});
			it("setup the commit-msg hook", function(){
				checkHook("commit-msg");
			});
			it("setup the post-commit hook", function(){
				checkHook("post-commit");
			});
			it("setup the pre-rebase hook", function(){
				checkHook("pre-rebase");
			});
			it("setup the post-checkout hook", function(){
				checkHook("post-checkout");
			});
			it("setup the post-merge hook", function(){
				checkHook("post-merge");
			});
			it("setup the pre-receive hook", function(){
				checkHook("pre-receive");
			});
			it("setup the update hook", function(){
				checkHook("update");
			});
			it("setup the post-receive hook", function(){
				checkHook("post-receive");
			});
			it("setup the post-update hook", function(){
				checkHook("post-update");
			});
			it("setup the pre-auto-gc hook", function(){
				checkHook("pre-auto-gc");
			});
			it("setup the post-rewrite hook", function(){
				checkHook("post-rewrite");
			});
			it("setup the pre-push hook", function(){
				checkHook("pre-push");
			});
		});

	});
});