const Koa = require('koa');
const Router = require('koa-router');
const filter = require('..');

const app = new Koa();
const router = new Router();

app.use(filter());

router.get('/', async ctx => {
  ctx.body = {
    name: 'tobi',
    email: 'tobi@segment.io',
    packages: 5,
    friends: ['tobi', 'loki', 'jane']
  };
});

router.get('/array', async ctx => {
  ctx.body = [
    {
      name: 'tobi',
      email: 'tobi@segment.io',
      packages: 5,
      friends: ['abby', 'loki', 'jane']
    },
    {
      name: 'loki',
      email: 'loki@segment.io',
      packages: 2,
      friends: ['loki', 'jane']
    }
  ];
});

app.use(router.routes());

module.exports = app;
