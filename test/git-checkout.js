describe("When GHM is in use,", function(){
	describe("checking out", function(){

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

		describe("a branch", function(){

			it("should run post-checkout", function(done){
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

		describe("a file", function(){

			it("should run post-checkout", function(done){
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
});