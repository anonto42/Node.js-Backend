import express from 'express';
import cors from 'cors';
import DBconnenct from './DB/dbConnent.js';
import dotenv from 'dotenv';
import createRoute from './Routes/user.Routes.js';

const app = express();

app.use(express.json({limit:"1000kb"}));
app.use(express.urlencoded({extended: true , limit:"1000kb"}));
app.use(cors(
    {
        origin:process.env.CORE_ORIGIN
    }
));
dotenv.config();

//Import routes
app.use("/api/user" , createRoute);


DBconnenct()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch(err=>console.error(err));