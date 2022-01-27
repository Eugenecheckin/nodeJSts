import jwt from 'jsonwebtoken';
import { SECRET } from '../config';

const getToken = ( res )=> {
  return jwt.sign( { email: res.dataValues.email, isAdmin: `${res.isAdmin||false}` }, SECRET );  
}

export default getToken;
