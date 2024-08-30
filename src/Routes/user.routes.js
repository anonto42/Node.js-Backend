import {Router} from 'express';
import { userRegister } from '../controller/user.controller.js';

const createRoute = Router();

createRoute.route("/register").post(userRegister);


export default createRoute;