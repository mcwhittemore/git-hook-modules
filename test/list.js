var fs = require("fs");
var path = require("path");

describe("git hooks list", function(){

	beforeEach(function(done){
		TEST_SUITE.setup(true, true, true, done);
	});

	it.only("should list out the commands", function(done){
		TEST_SUITE.hooks.list("pre-commit", function(err, stdout, stderr){
			if(err){
				done(err);
			}
			else{
				try{
					stdout.should.equal("echo Oh Yea! Lets Get This Commit Started!\n\n");
					done(err);
				}
				catch(err){
					done(err);
				}
			}
		});
	});

});