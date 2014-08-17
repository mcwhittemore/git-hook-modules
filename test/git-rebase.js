describe("When GHM is in use,", function(){
	describe("rebasing", function(){
		beforeEach(function(done){
			TEST_SUITE.setup(true, true, true, function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.git.__setupBranches(["test", "master"], done);
				}
			});
		});

		describe("should run", function(){

			var stdout = null;
			var stderr = null

			beforeEach(function(done){
				TEST_SUITE.git.rebase("test master", function(err, so, se){
					stdout = so;
					stderr = se;
					if(err){
						done(err);
					}
					else{
						done();
					}
				});
			
			});

			var check = function(str){
				if(stdout.indexOf(str)!==-1){
					return;
				}
				else if(stderr.indexOf(str)!==-1){
					return;
				}
				else{
					new Error("Git Hook was not run");
				}
			}
			
			it("pre-rebase", function(){
				check("pre-rebase");
			});

			it("applypatch-msg", function(){
				check("applypatch-msg");
			});

			it("pre-applypatch", function(){
				check("pre-applypatch");
			});

			it("post-applypatch", function(){
				check("post-applypatch");
			});

			it("post-rewrite", function(){
				check("post-rewrite");
			});

			it("post-checkout", function(){
				check("post-checkout");
			});
		});
	});
});