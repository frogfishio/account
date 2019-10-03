import AccountsHandler from '../../index';

let logger;

export default class AccountSkipLimitHandler extends AccountsHandler {
  get(req, res, next) {
    const split = req.path.split('/');
    const skip = split[3] || 0;
    const limit = split[5] || 0;

    this.api
      .find(this.query(req), skip, limit)
      .then(listings => {
        res.json(listings);
      })
      .catch(err => {
        err.send(res);
      });
  }
}
