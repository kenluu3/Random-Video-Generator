import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Request } from 'express';
import { Account } from '../models';

const generateToken = (payload: Object) => {
  const tokenDuration = '3h';
  return jsonwebtoken.sign(payload, process.env.EKEY as string, { expiresIn: tokenDuration });
}

const cookieExtractor = (req: Request) => {
  let token = null;

  if (req.cookies) {
    token = req.cookies['token'];
  }

  return token;
}

const jwtStrategyOptions = {
  secretOrKey: process.env.EKEY,
  jwtFromRequest: cookieExtractor,
}

passport.use(new passportJWT.Strategy(jwtStrategyOptions, async (jwtPayload, done) => {
  const { username } = jwtPayload

  try {
    const query = await Account.findOneBy({ username: username }); 

    if (!query) {
      return done(null, false);
    }

    const account = {
      id: query.id,
      username: query.username,
      email: query.email,
    }

    return done(null, account);
  } catch (error: any) {
    return done(error, false);
  }
}));

export { generateToken };