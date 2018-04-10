# koa-json-filter

Middleware allowing the client to filter the response to only what they need,
reducing the amount of traffic over the wire using the `?filter=foo,bar,baz` querystring parameter.

JSONSelect would also be great for this but I find it's a little too complicated for the average use-case,
so this is just a simple key filter.

## Installation

```
$ npm install @koa/json-filter
```

Please note that if you're using an earlier version of koa 2 with function generator you need to install the older version `0.0.1`

```
$ npm install koa-json-filter@0.0.1
```

## Options

* `name` querystring param defaulting to "filter"

## Filtering customization

You may also set `ctx.filter` to an array of names to filter on,
for example by using a header field `X-Filter: name,email`.

## Example

### Object responses

Script:

```js
const Koa = require('koa');
const filter = require('@koa/json-filter');

const app = new Koa();

app.use(filter());

app.use(async ctx => {
  ctx.body = {
    name: 'tobi',
    email: 'tobi@segment.io',
    packages: 5,
    friends: ['abby', 'loki', 'jane']
  };
});

app.listen(3000);
console.log('app listening on port 3000');
```

Response:

```
$ GET /?filter=name
{
  "name": "tobi"
}
```

### Array responses

Script:

```js
const Koa = require('koa');
const filter = require('@koa/json-filter');

const app = new Koa();

app.use(filter());

app.use(async ctx => {
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
    },
    {
      name: 'jane',
      email: 'jane@segment.io',
      packages: 2,
      friends: []
    },
    {
      name: 'ewald',
      email: 'ewald@segment.io',
      packages: 2,
      friends: ['tobi']
    }
  ];
});

app.listen(3000);
console.log('app listening on port 3000');
```

Response:

```
$ GET /?filter=name,email
[
  {
    "name": "tobi",
    "email": "tobi@segment.io"
  },
  {
    "name": "loki",
    "email": "loki@segment.io"
  },
  {
    "name": "jane",
    "email": "jane@segment.io"
  },
  {
    "name": "ewald",
    "email": "ewald@segment.io"
  }
]
```

# License

MIT
