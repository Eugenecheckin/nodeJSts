const jwt = require('jsonwebtoken');
import { SECRET } from '../config';

import { Request, Handler } from "express";

const isOwner: Handler = ( request, response, next ) => {  
  try {  
    const { authorization } = request.headers;
    const token = authorization.split(' ')[1];  
    const verifyResult = jwt.verify(token, SECRET);
    request.headers.email = verifyResult.email;
    request.headers.isAdmin = verifyResult.isAdmin;
    next();
  } catch {
    return response.status(403).json( { message: "Пользователь не авторизован" } )
  }
}
export default isOwner;
