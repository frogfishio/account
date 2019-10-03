import { Engine } from '@frogfish/engine';

let logger;

export default class AccountContextHandler {
  private account;

  constructor(private engine: Engine, private user) {
    logger = engine.log.log('@account-context');
    // this.account = engine.modules.module('account', user);
    this.account = engine.account;
  }

  post(req, res, next) {
    const accountId = req.path.split('/')[3];

    this.account
      .createContext(accountId, req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        logger.error(err);
        err.send(res);
      });
  }

  delete(req, res, next) {
    const accountId = req.path.split('/')[3];
    const contextId = req.path.split('/')[5];

    this.account
      .removeContext(accountId, contextId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        err.send(res);
      });
  }
}
