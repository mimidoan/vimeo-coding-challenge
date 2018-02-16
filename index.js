const fs = require('fs');
const validate = require('./validate.js');

// id [0],title[1],privacy[2],total_plays[3],total_comments[4],total_likes [5]

const fileName =
  '/Users/mimidoan/Documents/NYU_Courses/Junior/interviewprep/CodingChallenges/vimeo-coding-challenge/data/clips.csv';

function readIn(err, data) {
  if (err) throw err;

  // trim empty spaces
  const trim = data.trim(' ');
  // split by new line and skip 1st data row with column names
  const splitByLine = trim.split('\n').slice(1);

  // call parsing logic from validate.js - assign them to variables potential future usage
  const validData = validate.processValid(splitByLine);
  const invalidData = validate.processInvalid(splitByLine);
}

fs.readFile(fileName, 'utf8', readIn);

module.export = {
  readIn,
};
