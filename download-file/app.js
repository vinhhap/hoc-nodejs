var request = require("request");
var fs = require('fs');
var ProgressBar = require("progress");
var path = require("path");
var url = process.argv[2];
var fileName = path.basename(url);

var totalBytes, bar;
request(url, function(error, response) {
  if (!error && response.statusCode == 200) {
    var req = request(url);
    console.time('download');
    req.on("err", function(err) {
          console.log("Download error", err);
        })
       .on("response", function(res) {
          totalBytes = parseInt(res.headers["content-length"], 10);
          bar = new ProgressBar('  downloading [:bar] :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: totalBytes
          });
        })
       .on("data", function(chunk) {
         bar.tick(chunk.length);
       });
       
    req.pipe(fs.createWriteStream(fileName)
            .on("finish", function() {
              console.timeEnd('download');
              console.log('Done write to file');
            })
            .on("error", function(err) {
              console.log('Error write to file', err);
            })
    );
  } else {
    console.log("Loi");
  }
});
