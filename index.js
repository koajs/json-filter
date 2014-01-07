

module.exports = function(opts){
  var opts = opts || {};
  var name = opts.name || 'filter';

  return function *filter(next){
    yield *next;

    var body = this.body;

    // non-json
    if (!body || 'object' != typeof body) return;

    // check for filter
    var filter = this.query[name];
    if (!filter) return;
    filter = filter.split(/ *, */);

    // filter array
    if (Array.isArray(body)) {

    }

    // filter object
    this.body = filter.reduce(function(ret, key){
      ret[key] = body[key];
      return ret;
    }, {});
  }
};