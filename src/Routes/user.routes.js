import {Router} from 'express';
import { userRegister , postProduct ,  getProducts } from '../controller/user.controller.js';
import { upload } from '../middleware/uploader.middleware.js';

const createRoute = Router();

createRoute.route("/register").post(userRegister);

createRoute.route("/postProduct").post( upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount: 1}]) , postProduct);

createRoute.route("/getProducts").get(getProducts);


export default createRoute;