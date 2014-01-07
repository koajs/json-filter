
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
    if (!body || 'object' != typeof body) return;

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

    // filter object
    this.body = filter.reduce(function(ret, key){
      ret[key] = body[key];
      return ret;
    }, {});
  }
};
