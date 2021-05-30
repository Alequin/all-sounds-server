const path = require("path");
const thesaurus = require("thesaurus");

const audioLookupMap = require("./audio-lookup-map.json");

const lookupAudio = (audioToPlay) => {
  const audioName = audioLookupMap[audioToPlay];
  return path.resolve(__dirname, `./options/${audioName}/audio.mp3`);
};

module.exports = lookupAudio;
