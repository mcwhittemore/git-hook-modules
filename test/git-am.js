describe("When GHM is in use,", function(){
	describe("git am", function(){
		beforeEach(function(done){
			TEST_SUITE.setup(true, true, true, done);
		});

		it("should run applypatch-msg");
		it("should run pre-applypatch");
		it("should run post-applypatch");

	});
});