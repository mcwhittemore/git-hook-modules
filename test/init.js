describe("git hooks init", function(){

	describe("should not run when", function(){
		it("there is no .git folder present");
		it("there is no .git/hooks folder present");
	});

	describe("if there is a .git/hooks folder", function(){
		
		beforeEach(function(done){
			TEST_SUITE.initGit(function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.initHooks(done);
				}
			});
		});
		
		describe("it should", function(){

			var checkFiles = function(name){
				var liveHook = TEST_SUITE.getFileContents(name);
				var baseHook = fs.readFileSync("../base-files/"+name, {encoding:"utf8"});
				liveHook.should.equal(baseHook);
			}

			it.only("create a Hookfile if one is NOT present", function(){
				checkFiles("Hookfile");
			});

			it("setup the applypatch-msg hook", function(){
				checkFiles(".git/hooks/applypatch-msg");
			});
			it("setup the pre-applypatch hook", function(){
				checkFiles(".git/hooks/pre-applypatch");
			});
			it("setup the post-applypatch hook", function(){
				checkFiles(".git/hooks/post-applypatch");
			});
			it("setup the pre-commit hook", function(){
				checkFiles(".git/hooks/pre-commit");
			});
			it("setup the prepare-commit-msg hook", function(){
				checkFiles(".git/hooks/prepare-commit-msg");
			});
			it("setup the commit-msg hook", function(){
				checkFiles(".git/hooks/commit-msg");
			});
			it("setup the post-commit hook", function(){
				checkFiles(".git/hooks/post-commit");
			});
			it("setup the pre-rebase hook", function(){
				checkFiles(".git/hooks/pre-rebase");
			});
			it("setup the post-checkout hook", function(){
				checkFiles(".git/hooks/post-checkout");
			});
			it("setup the post-merge hook", function(){
				checkFiles(".git/hooks/post-merge");
			});
			it("setup the pre-receive hook", function(){
				checkFiles(".git/hooks/pre-receive");
			});
			it("setup the update hook", function(){
				checkFiles(".git/hooks/update");
			});
			it("setup the post-receive hook", function(){
				checkFiles(".git/hooks/post-receive");
			});
			it("setup the post-update hook", function(){
				checkFiles(".git/hooks/post-update");
			});
			it("setup the pre-auto-gc hook", function(){
				checkFiles(".git/hooks/pre-auto-gc");
			});
			it("setup the post-rewrite hook", function(){
				checkFiles(".git/hooks/post-rewrite");
			});
			it("setup the pre-push hook", function(){
				checkFiles(".git/hooks/pre-push");
			});
		});

		describe("and the Hookfile is also present", function(){
			before(function(done){
				TEST_SUITE.addHookfile(function(err){
					if(err){
						done(err);
					}
					else{
						TEST_SUITE.initHooks(done);
					}
				});
			});

			it("should not create a new Hookfile", function(){
				var liveHook = TEST_SUITE.getFileContents("Hookfile");
				liveHook.should.equal("");
			});
		});

	});
});