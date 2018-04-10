/**
 * Filter on responses.
 *
 *  - `name` querystring param name [filter]
 *
 * @param {Object} opts
 * @return {Promise}
 * @api public
 */

module.exports = opts => {
  const options = opts || {};
  const name = options.name || 'filter';

  return async function filter(ctx, next) {
    await next();

    const body = ctx.body;

    // non-json
    if (!body || 'object' != typeof body) return;

    // check for filter
    let filter = ctx.query[name] || ctx.filter;
    if (!filter) return;

    // split
    if ('string' == typeof filter) filter = filter.split(/ *, */);

    // filter array
    if (Array.isArray(body)) {
      ctx.body = body.map(obj => {
        return filter.reduce((ret, key) => {
          ret[key] = obj[key];
          return ret;
        }, {});
      });

      return;
    }

    // filter object
    ctx.body = filter.reduce((ret, key) => {
      ret[key] = body[key];
      return ret;
    }, {});
  };
};
