describe.only("git-checkout, when GHM is in use,", function(){

	beforeEach(function(done){
		TEST_SUITE.setup(true, true, true, function(err){
			if(err){
				done(err);
			}
			else{
				TEST_SUITE.git.__makeAddAndCommitFile("test", "test", done);
			}
		});
	});

	describe("when checking out a branch", function(){

		it("should run", function(done){
			TEST_SUITE.git.checkout("-b test", function(err, stdout, stderr){
				if(err){
					done(err);
				}
				else{
					try{
						stderr.should.equal("Switched to a new branch 'test'\npost-checkout\n\n");
						done();
					}
					catch(err){
						done(err);
					}
				}
			});
		});
	});

	describe("when checking out a file", function(){

		it("should reset to old content if the file has changed", function(done){
			TEST_SUITE.mkfile("test", "hmmmm", function(err){
				if(err){
					done(err);
				}
				else{
					TEST_SUITE.git.checkout("-- test", function(err, stdout, stderr){
						if(err){
							done(err);
						}
						else{
							try{
								stderr.should.equal("post-checkout\n\n");
								TEST_SUITE.getFileContents("test").should.equal("test\n");
								done();
							}
							catch(err){
								done(err);
							}
						}
					});
				}
			});
		});
	});

});