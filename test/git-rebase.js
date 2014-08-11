describe("git rebase, when GHM is in use,", function(){
	beforeEach(function(done){

		var handleErrOr = function(next){
			return function(err){
				if(err){
					done(err);
				}
				else{
					next();
				}
			}
		}

		TEST_SUITE.git.init(handleErrOr(function(){
			TEST_SUITE.addHookfile(handleErrOr(function(){
				TEST_SUITE.hooks.init(handleErrOr(function(){
					TEST_SUITE.git.checkout("-b test", handleErrOr(function(){
						TEST_SUITE.mkfile("in-test", "abc", handleErrOr(function(){
							TEST_SUITE.git.add(".", handleErrOr(function(){
								TEST_SUITE.git.commit("-m 'in-test'", handleErrOr(function(){
									TEST_SUITE.git.checkout("-b master", handleErrOr(function(){
										TEST_SUITE.mkfile("in-master", "abc", handleErrOr(function(){
											TEST_SUITE.git.add(".", handleErrOr(function(){
												TEST_SUITE.git.commit("-m 'in-master'", handleErrOr(function(){
													done();
												}));
											}));
										}));
									}));
								}));
							}));
						}));
					}));
				}));
			}));
		}));
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