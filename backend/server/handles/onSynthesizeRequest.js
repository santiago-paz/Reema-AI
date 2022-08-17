const { synthesize } = require("../core/synthesize");

function onSynthesizeRequest(req, res) {
  let reqData = '';

  req
    .on('data', chunk => {
      reqData += chunk;
    })
    .on('end', () => {
      synthesize(JSON.parse(reqData).text, () => {
        res.write("Done");
        res.end();
      });
    });
}
exports.onSynthesizeRequest = onSynthesizeRequest;
