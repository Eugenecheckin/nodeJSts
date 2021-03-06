import { Request, Handler } from "express";

import hash from '../utils/hash';
import getToken from '../utils/getToken';

import db from '../models/';

interface ISignUpBody{
  fullName: string,
  email: string,
  password: string,
  dob: string,
  isAdmin: boolean
}
export const sinUp: Handler = async ( request: Request<unknown, unknown, ISignUpBody>, response ) => {
  const { fullName, email, password, dob, isAdmin } = request.body;
  const usersRegistred  = await db.User.findAll( { where: { email } } );  
  if ( usersRegistred.length > 0 ) {
    return response.status(400).json( {message: "Пользователь с таким именем уже зарегистрирован"} )
  }  
  const hasPassword = hash(password);
  try {  
    const createdUser = await db.User.create({
        fullName,
        email,
        password: hasPassword,
        dob,
        isAdmin
    })
    const token = getToken(createdUser);
    response.status(200).json( { token , fullName, email} );
  }      
  catch(err) {
    return response.status(403).json( { message: "Ошибка регистрации нового пользователя", err: err.message } )
  }    
}

export const login:  Handler = async ( request, response ) => {
  const { email } = request.headers;
  try {    
    const allUsers = await db.User.findOne( { where: { email } } );
    response.status(200).json( {
      id: allUsers.id,
      name: allUsers.fullName,
      email: allUsers.email,
      isAdmin: allUsers.isAdmin
    });
  }
  catch( err ) {
    return response.status(403).json( { message: "Ошибка входа", err: err.message } )
  }    
}

