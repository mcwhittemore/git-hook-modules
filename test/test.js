require("should");

global.TEST_SUITE = null;

beforeEach(function(done){
	var suite = require("./suite");
	suite(function(err, api){
		if(err){
			done(err);
		}
		else{
			TEST_SUITE = api;
			done();
		}
	});
});