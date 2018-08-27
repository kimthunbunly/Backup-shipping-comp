const queryField = require ('../config/queryField');
const querySearch = require ('../config/querySearch');

module.exports = async function (req , model) {
  const e = model,
        q = req.query,
        p = parseInt(req.params.page);
  let limit = 10,
      filter = {},
      opts  = {};

  if (q.limit && parseInt(q.limit) <= 100) limit = parseInt(q.limit);
  if (q !== {} ) {
    await querySearch ( e , q , (result) => {
      filter = result;
    });
  }
  if (q.field) opts = await queryField ( e, q.field , 'option');

  req.skip =  (p - 1) * 10;
  req.limit = limit;
  req.filter = filter;
  req.opts = opts;
}
