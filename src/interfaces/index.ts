export { 
    Request, 
    Response, 
    Application, 
    NextFunction, 
    IRouter, 
    RequestHandler 
} from 'express';


export type POA = Promise<object[] | any>
export interface IHttp {
    get: Function;
    post: Function;
    put: Function;
    delete: Function;
    route: Function;
}

export interface IhttpResponse {
    headers: object;
    statusCode: number;
    body: object;
}

export enum EContentTypeAs {
    json = 'application/json'
}

export type HttpHeaders = {
    referer: string | undefined;
    userAgent: string | undefined;
    contentType: string | undefined;
    authorization?: string | undefined;
} 

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type Body = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export interface IhttpRequest {
    body: Body;
    query: object;
    params: object;
    ip: string;
    method: string;
    path: string;
    headers: HttpHeaders;
}

export interface IError {
  status?: number;
  message?: string;
}

export interface IServer {
    initiate(): any;
}

export interface IDStorageQuery {
    id: string;
    email: string;
} 

export interface ICreate {
    id: string;
    userInfo: IUser;
    source: HttpHeaders;
}

export interface IDb {
    connect(): Object;
}

export interface IDBStorage {
    findOne(query: string): POA;
    findAll(): POA;
    create(data: ICreate): POA;
}
