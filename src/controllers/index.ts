import { Request, Response, NextFunction, RequestHandler, IhttpRequest, ICreate } from '../interfaces';
import { addUser } from '../models';
import { writeValueToJSON, readValueFromJSON } from '../utils/FsOperations';
import { randomUUID } from 'crypto';
import { generateAccessToken } from '../middlewares/jwt';
import { getQuote } from '../services/quotes';


const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    
    const {headers, body, ip}: IhttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      ip: req.ip,
      headers: {
        contentType: req.get('Content-Type'),
        referer: req.get('referer'),
        userAgent: req.get('User-Agent'),
        authorization: req.get('authorization')
      }
    }

    const newUser: ICreate = addUser({
        id: randomUUID(),
        userInfo: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
        },
        source: {
            contentType: headers.contentType,
            referer: headers.referer,
            userAgent: headers.userAgent
        }
    });

    console.log(req.headers);
    

    const created = writeValueToJSON(newUser);

    res.status(201).send({
        message: "created",
        data: created
    });

}

const loginUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {headers, body, ip}: IhttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      ip: req.ip,
      headers: {
        contentType: req.get('Content-Type'),
        referer: req.get('referer'),
        userAgent: req.get('User-Agent'),
        authorization: req.get('authorization')
      }
    }

    const userEmail = body.email;
    const user = readValueFromJSON(userEmail);

    if (!user) {
        return res.status(404).send({
            message: "NO_FOUND",
            data: null
        });
    }
    const quote = await getQuote();
    const token = generateAccessToken(userEmail);
    res.status(404).send({
        message: "SUCCESS",
        data: {
            token,
            quote
        }
    });

    console.log(token);
}

export { createUser, loginUser }