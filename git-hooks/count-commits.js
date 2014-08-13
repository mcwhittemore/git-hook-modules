var key = process.argv[2];

var path = require("path");
var fs = require("fs");

var filePath = path.join(__dirname, "../.git/commit-counts.json");


var str = "{}";
try{
	str = fs.readFileSync(filePath, {encoding:"utf8"})
}
catch(err){
	console.log("Creating file to track commits in your .git folder");
}

data = JSON.parse(str);
data[key] = data[key] || 0;
data[key]++;

var commits = data[key] == 1 ? "1 commit" : data[key]+" commits";

console.log("You have "+commits+" marked as "+key);

var str = JSON.stringify(data);

fs.writeFileSync(filePath, str);