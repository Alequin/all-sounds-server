const fs = require("fs");
const path = require("path");

const audioDirectory = path.resolve(__dirname, "./options");
const outputDirectory = path.resolve(__dirname, "./audio-lookup-map.json");

const makeAudioLookupMap = () => {
  const audioOptions = fs.readdirSync(audioDirectory);

  const audioLookupMap = audioOptions.reduce((audioMap, audioName) => {
    const audioKeywordsFilePath = path.resolve(
      audioDirectory,
      `./${audioName}/keywords.json`
    );
    const audioKeywords = JSON.parse(fs.readFileSync(audioKeywordsFilePath));

    return {
      ...audioMap,
      ...audioKeywords.reduce(
        (keywords, word) => ({
          ...keywords,
          [word]: audioName,
        }),
        {}
      ),
    };
  }, {});

  fs.writeFileSync(outputDirectory, JSON.stringify(audioLookupMap));
};

module.exports = makeAudioLookupMap;
