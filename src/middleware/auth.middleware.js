import { jwt } from 'jsonwebtoken';
import { UserModel } from '../Model/user.model';

export const verifyJwt = async (req, res, next) => {
    try {
        
        const token = req.cookies?.accestokens || req.header("Authorization").replace("Bearer ", "");
    
        if (!token) return res.status(401).json({ message: "You are not authorized to access" });
    
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
    
        const user = await UserModel.findById(decodedToken?._id).select("-password -refreshToken");
    
        if(!user) return res.status(401).json({ message: "invalid token" });
    
        req.user = user;
    
        next();

    } catch (error) {
        console.log(error , {message:"some error in token validation"})
    }
}