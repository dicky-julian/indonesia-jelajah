import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { jwtSecretKey } from '../services/config';

const generateToken = (data) => {
  const token = jwt.sign(
    data,
    jwtSecretKey,
  );
  return token;
}

const decodeToken = (token) => {
  const tokenData = jwt_decode(token);
  return tokenData;
}

export {
  generateToken,
  decodeToken
}