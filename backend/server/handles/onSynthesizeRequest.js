const { synthesize } = require("../core/synthesize"),
  fileSystem = require('fs')

function onSynthesizeRequest(req, res) {
  let reqData = '';
  req
    .on('data', chunk => {
      reqData += chunk;
    })
    .on('end', () => {
      synthesize(JSON.parse(reqData).text, filename => {
        var stat = fileSystem.statSync(filename);
        console.log(filename);

        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': stat.size
        });

        var readStream = fileSystem.createReadStream(filename);
        // We replaced all the event handlers with a simple call to readStream.pipe()
        readStream.pipe(res);
      });
    });
}
exports.onSynthesizeRequest = onSynthesizeRequest;