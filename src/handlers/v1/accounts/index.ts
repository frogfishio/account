
let logger;

export default class AccountsHandler {
  protected api;

  constructor(private engine, private user) {
    logger = engine.log.log('@accounts');
    // this.api = engine.modules.module('account', user);
    this.api = engine.account;
  }

  get(req, res, next) {
    this.api
      .find(this.query(req))
      .then(listings => {
        res.json(listings);
      })
      .catch(err => {
        err.send(res);
      });
  }

  protected query(req) {
    const query = req.query || {};

    for (const name of Object.getOwnPropertyNames(query)) {
      if (query[name].indexOf(',') !== -1) {
        query[name] = query[name].split(',');
      }
    }

    return query;
  }
}
