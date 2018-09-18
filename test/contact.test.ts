const request = require('supertest');
import app from '../server/app';

const chai = require('chai');
const expect = chai.expect;

describe('GET /contact', () => {
  it('should return 200 OK', (done) => {
    request(app).get('/contact')
      .expect(200, done);
  });
});


describe('POST /contact', () => {
  it('should return false from assert when no message is found', (done) => {
    request(app).post('/contact')
      .field('name', 'John Doe')
      .field('email', 'john@me.com')
      .end(function(err, res) {
        // tslint:disable-next-line:no-unused-expression
        expect(res.error).to.be.false;
        done();
      })
      .expect(302);

  });
});
