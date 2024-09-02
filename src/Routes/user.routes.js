import {Router} from 'express';
import { userRegister , postProduct } from '../controller/user.controller.js';

const createRoute = Router();

createRoute.route("/register").post(userRegister);

createRoute.route("/postProduct").post(postProduct);


export default createRoute;