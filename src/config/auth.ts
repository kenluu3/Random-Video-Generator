import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';

import { Users } from '../models/users';
import dataSource from '../config/data-source';
import { devNull } from 'os';

export const generateJWT = (payload: Object, expiry: string) => {
  const token = jsonwebtoken.sign(payload, process.env.EKEY as string, { expiresIn: expiry });
  return `Bearer ${token}`;
}

export const jwtStrategyOptions = { 
  secretOrKey: process.env.EKEY,
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(new passportJWT.Strategy(jwtStrategyOptions, async (jwtPayload, done) => {
  const { username } = jwtPayload.username;

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

    return done(null, query);
  } catch (error: any) {
    return done(error, false);
  }
}));