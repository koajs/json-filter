
var request = require('supertest');
var filter = require('..');
var koa = require('koa');

var app = koa();

app.use(filter());

app.use(function *(){
  this.body = {
    name: 'tobi',
    email: 'tobi@segment.io',
    packages: 5,
    friends: ['tobi', 'loki', 'jane']
  }
});

describe('filter()', function(){
  describe('when ?filter is present', function(){
    describe('with one property', function(){
      it('should filter that property', function(done){
        request(app.listen())
        .get('/?filter=name')
        .expect({ name: 'tobi' }, done);
      })
    })

    describe('with multiple properties', function(){
      it('should split on commas', function(done){
        request(app.listen())
        .get('/?filter=name,packages')
        .expect({ name: 'tobi', packages: 5 }, done);
      })
    })
  })
})