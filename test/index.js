const request = require('supertest');
const app = require('./app');

describe('filter()', () => {
  let server;

  beforeEach(() => (server = app.listen()));
  afterEach(() => server.close());

  describe('when ?filter is missing', () => {
    it('should be ignored', async() => {
      await request(server)
        .get('/')
        .expect(200);
    });
  });

  describe('when ?filter is present', () => {
    describe('with one property', () => {
      it('should filter that property', async() => {
        await request(server)
          .get('/?filter=name')
          .expect({ name: 'tobi' });
      });
    });

    describe('with an array response', () => {
      it('should filter each document', async() => {
        await request(server)
          .get('/array?filter=name')
          .expect([{ name: 'tobi' }, { name: 'loki' }]);
      });
    });

    describe('with multiple properties', () => {
      it('should split on commas', async() => {
        request(server)
          .get('/?filter=name,packages')
          .expect({ name: 'tobi', packages: 5 });
      });
    });
  });
});
