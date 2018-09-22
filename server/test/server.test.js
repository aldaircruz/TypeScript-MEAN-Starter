const request = require('supertest');
const app =  require('../');

const chai = require('chai');
const expect = chai.expect;

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/')
      .expect(200, done);
  });
});