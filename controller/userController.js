import { StatusCodes } from 'http-status-codes';
import User2 from '../models/userModels.js';


export const getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  res.status(StatusCodes.OK).json({ Token:token });
};

