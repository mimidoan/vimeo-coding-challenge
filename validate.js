// id [0],title[1],privacy[2],total_plays[3],total_comments[4],total_likes [5]

const fs = require('fs');

function writeTo(data, fileName) {
   fs.appendFile(fileName, data, (err) => {
    if (err) throw err;
  });
}

/*= ===== checks for valid parameters  ====== */
function isValid(entry) {
  const final = entry.split(',');

  if (final[1].length < 30 && final[2] === 'anybody' && final[3] > 200 && final[5] > 10) {
    return { id: final[0], tag: 'valid' };
  }
  return { id: final[0], tag: 'invalid' };
}

/*= ===== Driver Function that takes in CSV data and calls helper functions ====== */
function process(csvData) {
  /** ***************************************************************************
   passes through data twice with an O(2N) runtime, but has the added elegance
   of being able to utilize valid/invalid arrays to further proces data later on
  ***************************************************************************** */

  console.log('$$$$$$$$$$$$$$$$$$$$$$$$ final', csvData.length);
  const valid = [...csvData]
    .map((entry) => {
      const name = `${isValid(entry).id},`;

      if (isValid(entry).tag === 'valid') {
        writeTo(name, 'data/valid.csv');
        return entry;
      }
    })
    .filter(vid => vid); // filter out null/undefined/etc

  console.log('$$$$$$$$$$$ VALID $$$$$$$$$$$', valid.length);

  const invalid = [...csvData]
    .map((entry) => {
      const name = `${isValid(entry).id},`;

      if (isValid(entry).tag === 'invalid') {
        writeTo(name, 'data/invalid.csv');
        return entry;
      }
    })
    .filter(vid => vid); // filter out null/undefined/etc

  console.log('$$$$$$$$$$$ INVALID $$$$$$$$$$$', invalid.length);
}

// where to splitByComma from?

module.exports = {
  process,
};
