const fs = require("fs");
const express = require("express");
const lookupAudio = require("./audio/lookup-audio");
const app = express();

const port = process.env.PORT || 3000;

app.get("/sound/:audioToPlay", (req, res) => {
  const { audioToPlay } = req.params;
  if (!audioToPlay) return res.status(404).send("Unknown audio");

  var filePath = lookupAudio(audioToPlay);
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
