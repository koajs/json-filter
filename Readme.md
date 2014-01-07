
# koa-json-filter

  Middleware allowing the client to filter the response to only what they need,
  reducing the amount of traffic over the wire.

  JSONSelect would also be great for this but I find it's a little too complicated for the average use-case,
  so this is just a simple key filter.

## Installation

```
$ npm install koa-json-filter
```

## Example

### Object responses

  Script:

```js
var filter = require('koa-filter');
var koa = require('koa');

var app = koa();

app.use(filter());

app.use(function *(){
  this.body = {
    name: 'tobi',
    email: 'tobi@segment.io',
    packages: 5,
    friends: ['abby', 'loki', 'jane']
  }
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
var filter = require('koa-filter');
var koa = require('koa');

var app = koa();

app.use(filter());

app.use(function *(){
  this.body = [
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
  ]
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