import { Request } from 'express';

import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';

import { Users } from '../models/users';
import dataSource from '../config/data-source';

export const generateJWT = (payload: Object, expiry: string) => {
  return jsonwebtoken.sign(payload, process.env.EKEY as string, { expiresIn: expiry });
}

export const cookieExtractor = (req: Request) => {
  let token = null;

  if (req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
}

export const jwtStrategyOptions = { 
  secretOrKey: process.env.EKEY,
  jwtFromRequest: cookieExtractor
}

passport.use(new passportJWT.Strategy(jwtStrategyOptions, async (jwtPayload, done) => {
  const { username } = jwtPayload

  try {
    const query = await dataSource
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.username = :username', {username})
      .getOne();
    
    if (!query) {
      return done(null, false);
    }
    
    const user = { 
      id: query.id,
      username: query.username
    };

    return done(null, user);
  } catch (error: any) {
    return done(error, false);
  }
}));