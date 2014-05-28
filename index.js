
var isObjectStream = require('is-object-stream').readable;
var Transform = require('stream').Transform;
/**
 * Filter on responses.
 *
 *  - `name` querystring param name [filter]
 *
 * @param {Object} opts
 * @return {GeneratorFunction}
 * @api public
 */

module.exports = function(opts){
  var opts = opts || {};
  var name = opts.name || 'filter';

  return function *filter(next){
    yield *next;

    var body = this.body;

    // non-json
    if (!body || 'object' != typeof body) return console.log('nope');

    // check for filter
    var filter = this.query[name] || this.filter;
    if (!filter) return;

    // split
    if ('string' == typeof filter) filter = filter.split(/ *, */);

    // filter array
    if (Array.isArray(body)) {
      this.body = body.map(function(obj){
        return filter.reduce(function(ret, key){
          ret[key] = obj[key];
          return ret;
        }, {});
      });

      return;
    }

    // filter object stream
    if (isObjectStream(body)) {
      var transform = this.body = new Transform({ objectMode: true });
      transform._transform = function (doc, encoding, cb) {
        this.push(filter.reduce(function (ret, key){
          ret[key] = doc[key];
          return ret;
        }, {}));
        cb();
      };
      body.pipe(transform);

      return;
    }

    // filter object
    this.body = filter.reduce(function(ret, key){
      ret[key] = body[key];
      return ret;
    }, {});
  }
};
