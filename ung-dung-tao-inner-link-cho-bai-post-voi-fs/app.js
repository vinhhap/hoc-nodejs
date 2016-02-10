var fs = require('fs'),
    data = {'node': 'http://techmaster.vn/khoa-hoc/25480/nodejs-truc-tuyen',
            'php' : 'http://techmaster.vn/khoa-hoc/8229/lap-trinh-phalcon-php-2'};

var replaceData = function(someFile) {
  fs.readFile(someFile, 'utf8', function(err, result) {
    if(err) return console.log(err);
    var word1Num = Math.floor(result.match(/(^|\W)Node($|\W)/g).length * 0.3),
        word2Num = Math.floor(result.match(/(^|\W)PHP($|\W)/g).length * 0.3);
    for(var i = 1; i <= word1Num; i++) {
      result = result.replace(/(^|\W)Node($|\W)/, ' <a href="' + data.node + '">Node</a> ');
    }
    for(var n = 1; n <= word2Num; n++) {
      result = result.replace(/(^|\W)PHP($|\W)/, ' <a href="' + data.php + '">Php</a> ');
    }
    fs.writeFile(someFile, result, 'utf8', function(err) {
      if(err) return console.log(err);
      console.log("DONE!");
    });
  });
};
replaceData('demo.html');