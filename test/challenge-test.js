const chai = require('chai');

const expect = chai.expect;
const fs = require('fs');
require('mocha');
const valid = require('../validate.js');
const index = require('../index.js');


const invalidObj = { id: '200019', tag: 'invalid' };
const validObj = { id: '200111', tag: 'valid' };

const validProcessed = [
  '200111,5 Memorial Weekend Vignettes,anybody,689,24,21',
  '200224,show us the muscles,anybody,341,8,12',
  '200318,My 5 Vignettes ,anybody,673,10,11',
  '200346,BIKE THE DRIVE MAY 27 2007,anybody,415,32,26',
];

const invalidProcessed = [
  '200019,Drift Day,users,205,10,6',
  '200088,Bloc Party- The Prayer,anybody,751,0,10',
  '200108,Charlotte Gainsbourg- Songs That We Sing,anybody,1964,2,23',
  '200197,5@5 vignettes,anybody,119,3,8',
  '200256,hurdy gurdy,anybody,236,5,7',
  '200354,Musical 5 X 5 X Ctd3,anybody,125,10,7',
];

const csvData = [
  '200019,Drift Day,users,205,10,6',
  '200088,Bloc Party- The Prayer,anybody,751,0,10',
  '200108,Charlotte Gainsbourg- Songs That We Sing,anybody,1964,2,23',
  '200111,5 Memorial Weekend Vignettes,anybody,689,24,21',
  '200197,5@5 vignettes,anybody,119,3,8',
  '200224,show us the muscles,anybody,341,8,12',
  '200256,hurdy gurdy,anybody,236,5,7',
  '200318,My 5 Vignettes ,anybody,673,10,11',
  '200346,BIKE THE DRIVE MAY 27 2007,anybody,415,32,26',
  '200354,Musical 5 X 5 X Ctd3,anybody,125,10,7',
];

describe('validate.js', () => {

  it('isValid() returns VALID clip with VALID tag and clip_id', () => {
    expect(valid.isValid('200111,5 Memorial Weekend Vignettes,anybody,689,24,21')).to.deep.equal(validObj);
  });

  it('isValid() returns INVALID clip with INVALID tag and clip_id', () => {
    expect(valid.isValid('200019,Drift Day,users,205,10,6')).to.deep.equal(invalidObj);
  });

  it('writeTo(), wrapper for appends to a pre-existing text file or creates a new one if it does not exist', () => {
    fs.appendFile('../data/invalid.csv', invalidObj, (err) => {
      expect(err).to.be.null;
    });
  });

  it('processValid() should return an array of Valid clips', () => {
    expect(valid.processValid(csvData)).to.deep.equal(validProcessed);
  });

  it('processInvalid() should return an array of Invalid clips', () => {
    expect(valid.processInvalid(csvData)).to.deep.equal(invalidProcessed);
  });
});

// invalid: 200019,Drift Day,users,205,10,6
// valid: 200111,5 Memorial Weekend Vignettes,anybody,689,24,21
