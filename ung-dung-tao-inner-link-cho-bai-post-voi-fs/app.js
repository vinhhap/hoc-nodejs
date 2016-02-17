var fs = require("fs");
var data1 = {
  'php': 'http://techmaster.vn/khoa-hoc/8229/lap-trinh-phalcon-php-2',
  'node' : 'http://techmaster.vn/khoa-hoc/25480/nodejs-truc-tuyen'
};
var randomIntFromInterval =  function(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
};

fs.readFile("index.html", "utf8", function(err, data) {
  if(err) return console.log(err);
  var replaceInnerLink = function(text, searchWord, replaceWord) {
    var dataArr = text.split(" ");
    var allPositions = [];
    var numToReplace;
    var randomPosition;
    for(var i = 0; i < dataArr.length; i++) {
      if(dataArr[i] === searchWord) allPositions.push(i);
    }
    console.log(allPositions.length);
    numToReplace = Math.floor(allPositions.length / 3);
    console.log(numToReplace);
    for(var n = 1; n <= numToReplace; n++) {
      randomPosition = randomIntFromInterval(0, dataArr.length);
      console.log(randomPosition);
      dataArr[randomPosition] = replaceWord;
    }
    return dataArr.join(" ");
  };
  var result1 = replaceInnerLink(data, "Node.js", "<a href='" + data1.node + "'>Node.js</a>");
  var result2 = replaceInnerLink(result1, "PHP", "<a href='" + data1.php + "'>PHP</a>");
  fs.writeFileSync("index.html", result2);
});