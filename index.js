const fs = require('fs');
const validate = require('./validate.js');

const fileName = process.argv[2];

function readIn(err, data) {
  if (err) throw err;

  // trim empty spaces
  const trim = data.trim(' ');
  // split by new line and skip 1st data row with column names
  const splitByLine = trim.split('\n').slice(1);

  // call parsing logic from validate.js - assign them to variables potential future usage
  const validData = validate.processValid(splitByLine);
  const invalidData = validate.processInvalid(splitByLine);

  // log # clips to console for visual clarification
  console.log('======== Total Clips ======== ', splitByLine.length);
  console.log('======== # Valid Clips ======== ', validData.length);
  console.log('======== # Invalid Clips ======== ', invalidData.length);
}

fs.readFile(fileName, 'utf8', readIn);

module.export = {
  readIn,
};
