//cookies se check krna 
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;//hame cookie me name diya hai na token ka accesstoken krke 

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }    

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, 'Forbidden'));
    }
    // req.user = user;
    next(); //then we go to the update user route in user.controller and user route

  });
};
