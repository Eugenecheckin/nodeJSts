import { Request, Handler } from "express";

import db from '../models/';

import hash from '../utils/hash';
import getToken from '../utils/getToken.js';

interface IUpdateBody{
  fullName: string,
  userEmail: string
}
export  const update: Handler = async ( request: Request<unknown, unknown, IUpdateBody>, response ) => {

    const { fullName, userEmail } = request.body;
    const { email , isAdmin } = request.headers;   

    if( isAdmin==='true' ) {
      try {
        const updatedUser = await db.User.update( { fullName }, { where: { email: userEmail } } );
        return response.status(200).json({
          result: updatedUser,
          fullName,
          userEmail
        });
      }
      catch( err ) {
        return response.status(403).json( { message: "Ошибка обновления данных пользователя", err: err.message } )
      }
    }   
    try { 
      const updatedUser = await db.User.update( { fullName }, { where: { email } } );
      return response.status(200).json({
        result: updatedUser,
        fullName,
        email
      });
    }
    catch( err ) {
      return response.status(403).json( { message: "Ошибка обновления данных пользователя", err: err.message } )
    }
  }   
interface IDestroyBody {
  userEmail: string;
}  
export  const destroy: Handler = async ( request: Request<unknown, unknown, IDestroyBody>, response ) => {
    const { isAdmin , email } = request.headers;
    if ( isAdmin === 'true' ) {
      const { userEmail } = request.body;
      await db.User.destroy( { where: { email: userEmail } } );
      return response.status(200).json( { message: "Пользователь удален", userEmail } )
    }
    await db.User.destroy( { where: { email } } );
    response.status(200).json( { message: "Пользователь удален", email } )    
  }

export  const getList: Handler = async ( request, response ) => {
    try { 
      const users =await db.User.findAll();
      response.status(200).json(users);
    }
    catch( err ) {
      return response.status(403).json( { message: "Ошибка получения списка пользователей", err: err.message } )
    }     
  }
interface ICreateBody {
  fullName: string,
  newEmail: string,
  password: string,
  dob: string,
  isAdmin: boolean
}
export  const create: Handler = async ( request: Request<unknown, unknown, ICreateBody>, response ) => {
    const { fullName, newEmail, password, dob, isAdmin } = request.body;
    const isRegistred = await db.User.findAll( { where: { email: newEmail } } );  
    if ( isRegistred.length > 0 ) {
    return response.status(400).json( {message: "Пользователь с таким именем уже зарегистрирован"} )
    }  
    const hasPassword = hash(password);  
    try {
      const createdUser = await db.User.create({
        fullName,
        email: newEmail,
        password: hasPassword,
        dob,
        isAdmin
      });
      const token = getToken(createdUser);
      response.status(200).json( { token } );
    }
    catch( err ) {
      return response.status(403).json( { message: "ошибка регистрации нового пользователя", err: err.message } )
    }      
  }

