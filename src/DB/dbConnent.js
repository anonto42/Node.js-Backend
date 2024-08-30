import mongoose from "mongoose";

const DBconnenct = async () =>{
    try {

        const connaction = await mongoose.connect(`${process.env.MONDODB_URL}/${process.env.DB_NAME}`);

        console.log(connaction.connection.host);

    } catch (error) {
        console.log("Your db was not connented there is some problem",error)
    }
}

export default DBconnenct;