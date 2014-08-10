describe("git commit, when GHM is in use,", function(){

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

	describe("and there is something to be commited", function(){

		var commitOutput = null;

		beforeEach(function(done){
			TEST_SUITE.mkfile("new-file.txt", "this is new", function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.git.add("new-file.txt", function(err){
						if(err){
							done(err);
						}
						else{
							TEST_SUITE.git.commit("testing", function(err, stdout){
								if(err){
									done(err);
								}
								else{
									commitOutput = stdout;
									done();
								}
							});
						}
					});
				}
			});
		});

		var checkForHookMessage = function(msg){
			if(commitOutput.indexOf(msg)==-1){
				throw new Error("Git Hook did not run");
			}
		}

		it("should run pre-commit", function(){
			checkForHookMessage("pre-commit")
		});
		
		it("should run post-commit", function(){
			checkForHookMessage("post-commit")
		});

	});

	describe("and there is nothing to be commited", function(){

	});

});