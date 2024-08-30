import express from 'express';
import cors from 'cors';
import DBconnenct from './DB/dbConnent.js';
import { configDotenv } from 'dotenv';
import createRoute from './Routes/user.Routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin:process.env.CORE_ORIGIN
    }
));
configDotenv();

//Import routes
app.use("/api/user" , createRoute);


DBconnenct()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch(err=>console.error(err));