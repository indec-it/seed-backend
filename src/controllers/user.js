import ArqService from '../services/arq.js';

export class UserController {
  static session(req, res, next) {
    try {
      res.send({success: true, user: req.user});
    } catch (err) {
      next(err);
    }
  }

  static async validateSession(req, res, next) {
    try {
      const {user, success} = await ArqService.validateToken(req.body.token);
      res.send({success, user});
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const {token, user} = await ArqService.login(req.body);
      res.send({success: true, token, user});
    } catch (err) {
      next(err);
    }
  }
}
