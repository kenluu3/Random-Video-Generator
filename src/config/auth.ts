import jsonwebtoken from 'jsonwebtoken';

export const generateJWT = (payload: Object, expiry: string) => {
  const token = jsonwebtoken.sign(payload, process.env.EKEY as string, { expiresIn: expiry });

  return `Bearer ${token}`;
}