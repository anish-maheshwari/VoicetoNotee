import { Router } from 'express';
const router = Router();


import {
  getCurrentUser
} from '../controller/userController.js';





router.get('/current-user', getCurrentUser);



export default router;
