import CryptoJS from "crypto-js";
import { HASH_MESS } from '../config';

const hash = ( password: string ) => {
  return CryptoJS.AES.encrypt(HASH_MESS, password).toString();
}

export default hash;
