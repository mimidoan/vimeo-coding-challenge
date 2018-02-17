const chai = require('chai');

const expect = chai.expect;
require('mocha-sinon');
const valid = require('../validate.js');

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

function mockConsoleOutput() {
  const log = console.log;
  this.sinon.stub(console, 'log').callsFake(function () {
    return log.apply(log, arguments);
  });
}

describe('isValid()', () => {
  it('isValid() returns VALID clip with VALID tag and clip_id', () => {
    expect(valid.isValid('200111,5 Memorial Weekend Vignettes,anybody,689,24,21')).to.deep.equal(validObj);
  });

  it('isValid() returns INVALID clip with INVALID tag and clip_id', () => {
    expect(valid.isValid('200019,Drift Day,users,205,10,6')).to.deep.equal(invalidObj);
  });
});

describe('Processing Data', () => {
  it('processValid() should return an array of Valid clips', () => {
    expect(valid.processValid(csvData)).to.deep.equal(validProcessed);
  });

  it('processInvalid() should return an array of Invalid clips', () => {
    expect(valid.processInvalid(csvData)).to.deep.equal(invalidProcessed);
  });
});

describe('writeTo()', () => {
  beforeEach(mockConsoleOutput);

  it('writeTo(), log error if no parameters are passed in', () => {
    valid.writeTo();
    expect(console.log.callCount).to.equal(1);
    expect(console.log.calledWith('no data or fileName was passed in')).to.be.true;
  });

  it('writeTo(), log error if < 2 parameters are passed in', () => {
    valid.writeTo('heyheyhey');
    expect(console.log.callCount).to.equal(1);
    expect(console.log.calledWith('no data or fileName was passed in')).to.be.true;
  });

  it('writeTo(), expect undefined to be returned if all is well', () => {
    expect(valid.writeTo('data,', 'data/testFile.csv')).to.be.undefined;
  });
});
