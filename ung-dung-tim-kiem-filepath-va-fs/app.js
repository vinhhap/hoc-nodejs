var fs = require('fs');
var path = require('path');
var processData = process.argv;
var result = [];

var check = function(directory, fileName) {
    var files = fs.readdirSync(directory);
    files.forEach(function(file) {
        var stat = fs.statSync(path.join(directory, file));
        if (stat.isFile()){
            if (file == fileName){
                result.push(path.join(directory, fileName));
            }
        } else {
            check(path.join(directory,file),fileName);
        }
    });
};

check(processData[3], processData[2]);
if(result.length > 0) {
    console.log("Tim thay " + result.length + " file tai cac thu muc: ");
    result.forEach(function(direct) {
       console.log(direct); 
    });
} else {
    console.log("Khong tim thay file");
}