describe("git commit, when GHM is in use,", function(){

	beforeEach(function(done){
		TEST_SUITE.setup(true, true, true, done);
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
							TEST_SUITE.git.commit("-m testing", function(err, stdout, stderr){
								if(err){
									done(err);
								}
								else{
									commitOutput = stderr;
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
			checkForHookMessage("pre-commit");
		});

		it("should run post-commit", function(){
			checkForHookMessage("post-commit");
		});

		it("should run prepare-commit-msg", function(){
			checkForHookMessage("prepare-commit-msg");
		});

		it("should run commit-msg", function(){
			checkForHookMessage("commit-msg");
		});

	});

	describe("--amend -m 'just an update'", function(){

		var commitOutput = null;

		beforeEach(function(done){
			TEST_SUITE.git.__makeAddAndCommitFile("test", "test", function(err){
				TEST_SUITE.git.commit("--amend -m 'just an update'", function(err, stdout, stderr){
					if(err){
						done(err);
					}
					else{
						commitOutput = stderr;
						done();
					}
				});
			});
		});

		var checkForHookMessage = function(msg){
			if(commitOutput.indexOf(msg)==-1){
				throw new Error("Git Hook did not run");
			}
		}

		it("should run pre-commit", function(){
			checkForHookMessage("pre-commit");
		});

		it("should run post-commit", function(){
			checkForHookMessage("post-commit");
		});

		it("should run prepare-commit-msg", function(){
			checkForHookMessage("prepare-commit-msg");
		});

		it("should run commit-msg", function(){
			checkForHookMessage("commit-msg");
		});

	});

});