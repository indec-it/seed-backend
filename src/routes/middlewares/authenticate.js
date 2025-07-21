import ArqService from '../../services/arq.js';

export default async (req, res, next) => {
  const header = req.get('Authorization');
  if (!header) {
    return res.sendStatus(401);
  }
  try {
    const {success, user, message, tokenExpired} = await ArqService.validateToken(header);
    if (!success || user.deleted) {
      return res.sendStatus(401);
    }
    req.user = {
      ...user,
      message,
      tokenExpired
    };
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
