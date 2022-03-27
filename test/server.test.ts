import supertest from 'supertest';

import server from '../src/server';

describe('GET /user', () => {
  it('responds with JSON', done => {
    supertest(server).get('/user').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
