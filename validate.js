// id [0],title[1],privacy[2],total_plays[3],total_comments[4],total_likes [5]

const fs = require('fs');

/*= ===== writes data to file  ====== */
function writeTo(data, fileName) {
  if (data && fileName) {
    fs.appendFile(fileName, data, (err) => {
      if (err) throw err;
    });
  } else {
     console.log('no data or fileName was passed in');
  }
}

/*= ===== checks for valid parameters  ====== */
function isValid(entry) {
  const final = entry.split(',');

  // checks for parameters specified by coding challenge && clip_id must be a valid number from 1 -> MAX_INT
  if (
    Number(final[0]) &&
    Number(final[0]) > 0 &&
    final[1].length < 30 &&
    final[2] === 'anybody' &&
    final[3] > 200 &&
    final[5] > 10
  ) {
    return { id: final[0], tag: 'valid' };
  }
  return { id: final[0], tag: 'invalid' };
}

/*= ===== Functions that take in CSV data, calls helper functions, and returns arrays of valid/invalid clips ====== */
/** ***************************************************************************
 passes through data twice with an O(2N) runtime, but has the added elegance
 of being able to utilize valid/invalid arrays to further proces data later on
***************************************************************************** */
function processValid(csvData) {
  const valid = [...csvData]
    .map((entry) => {
      const name = `${isValid(entry).id},`;

      if (isValid(entry).tag === 'valid') {
        writeTo(name, 'data/valid.csv');
        return entry;
      }
    })
    .filter(vid => vid); // filter out null/undefined/etc

  return valid;
}

function processInvalid(csvData) {
  const invalid = [...csvData]
    .map((entry) => {
      const name = `${isValid(entry).id},`;

      if (isValid(entry).tag === 'invalid') {
        writeTo(name, 'data/invalid.csv');
        return entry;
      }
    })
    .filter(vid => vid); // filter out null/undefined/etc

  return invalid;
}

module.exports = {
  processValid,
  processInvalid,
  isValid,
  writeTo,
};
