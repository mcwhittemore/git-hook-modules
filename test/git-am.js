describe("git am, when GHM is in use,", function(){
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

	it("should run applypatch-msg");
	it("should run pre-applypatch");
	it("should run post-applypatch");

});