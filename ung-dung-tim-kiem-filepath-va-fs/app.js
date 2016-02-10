var fs = require('fs'),
    path = require('path'),
    name = 'test.js';

var timKiem = function(name) {
    var currentPath = __dirname;
    fs.stat(path.join(currentPath, name), function(err, stats) {
      stats == undefined ? console.log("Khong ton tai") : console.log("duong dan den file: " + path.join(currentPath, name));
    });  
};
timKiem(name);