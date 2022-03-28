import supertest from 'supertest';

import server from '../src/server';

describe('GET /0118-999-881-999-119-7253', () => {
  it('retrieves the expected question', async () => {
    await supertest(server)
      .get('/0118-999-881-999-119-7253')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(418, { question: 'Did you see that ludicrous display last night?' });
  });
});
