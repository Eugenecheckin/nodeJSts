import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

import { Handler } from "express";

interface IUserPayload extends jwt.JwtPayload {
  isAdmin: string;
  email: string;
}
const isOwner: Handler = ( request, response, next ) => {  
  try {  
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];  
    const verifyResult = <IUserPayload>jwt.verify(token, SECRET);
    request.headers.email = verifyResult.email;
    request.headers.isAdmin = verifyResult.isAdmin;
    next();
  } catch {
    return response.status(403).json( { message: "Пользователь не авторизован" } )
  }
}
export default isOwner;
