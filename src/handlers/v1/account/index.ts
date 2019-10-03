import { Engine } from '@frogfish/engine';

let logger;

export default class AccountHandler {
  private account;

  constructor(private engine: Engine, private user) {
    logger = engine.log.log('@account');
    // this.account = engine.modules.module('account', user);
    this.account = engine.account;
  }

  post(req, res, next) {
    this.account
      .create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
        err.send(res);
      });
  }

  put(req, res, next) {
    const listingId = req.path.split('/')[3];

    this.account
      .update(listingId, req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        logger.error(err);
        err.send(res);
      });
  }

  get(req, res, next) {
    const jobId = req.path.split('/')[3];

    this.account
      .get(jobId)
      .then(job => {
        res.json(job);
      })
      .catch(err => {
        err.send(res);
      });
  }

  delete(req, res, next) {
    const slugOrId = req.path.split('/')[3];

    this.account
      .remove(slugOrId)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        err.send(res);
      });
  }
}
