const jwt = require('jsonwebtoken');
import { APP_VAR } from '../configs';
import { Request, Response, NextFunction } from '../interfaces';


export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, APP_VAR.tokenSecret as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export const generateAccessToken = (email: string) => {
    return jwt.sign({
        data: email
    }, APP_VAR.tokenSecret, { expiresIn: 60 * 60 });
}