import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

import { Handler } from "express";

interface IUserPayload extends jwt.JwtPayload {
  isAdmin: string;
  email: string;
}

const isAdmin: Handler = ( request, response, next ) => {  
  try {  
    const { authorization } = request.headers;
    const token: string = authorization.split(' ')[1];  
    const verifyResult = <IUserPayload>jwt.verify(token, SECRET);
    
    if( verifyResult.isAdmin !== 'true' ) {    
      return response.status(403).json( { message: "Пользователь не администратор" } )
    }
    request.headers.isAdmin = verifyResult.isAdmin; 
    request.headers.email = verifyResult.email;    
    next();
  } catch( err ) {
    return response.status(403).json( { message: "Ошибка идентификации", err: err.message } )
  }
}

export default isAdmin;