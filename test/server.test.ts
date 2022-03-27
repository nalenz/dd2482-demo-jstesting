import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import server from '../src/server';

describe('POST /shopping-cart', () => {
  it('accepts a correct request with status 204', async () => {
    await supertest(server)
      .post('/shopping-cart/' + uuidv4())
      .set('Accept', 'application/json')
      .send({ name: 'Laptop', price: 800 })
      .expect(204);
  });

  it('rejects a request without a price with status 422 and an ajv response', async () => {
    await supertest(server)
      .post('/shopping-cart/' + uuidv4())
      .set('Accept', 'application/json')
      .send({ name: 'Price missing' })
      .expect('Content-Type', /json/)
      .expect(422, {
        body: [
          {
            keyword: 'required',
            dataPath: '',
            schemaPath: '#/required',
            params: { missingProperty: 'price' },
            message: "should have required property 'price'",
          },
        ],
      });
  });
});

describe('GET /shopping-cart', () => {
  it('can retrieve an item stored in a shopping cart', async () => {
    const id = uuidv4();
    const cartItem = { name: 'Phone', price: 500 };
    const test = supertest(server);

    // add the item to the shopping cart
    await test
      .post('/shopping-cart/' + id)
      .set('Accept', 'application/json')
      .send(cartItem)
      .expect(204);

    // check if the item was actually added to this shopping cart
    await test
      .get('/shopping-cart/' + id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [cartItem]);
  });
});
