import { Product } from '../Model/postProduct.model.js';
import { uploadOnCloudinary } from '../util/cloudinary.js';
import{ UserModel} from './../Model/user.model.js';


const generateAccesTokenAndRefreshTokens = async (userId) =>{
    try {
        const user = await UserModel.findById(userId);
        if(!user) return console.log("User not found");
        const accestokens = user.generateAccesToken();
        const refreshtoken = user.generateRefreshToken();
        
        user.refreshToken = refreshtoken;
        await user.save({validateBeforeSave:false});

        return { accestokens , refreshtoken }
    } catch (error) {
        console.log(error , {message:"some things went wrong in generating tokens"})
    }
}

const userRegister = async (req, res) => {
    const { email , password , phone , firstName , lastName } = req.body

    if ([email , password , phone , firstName , lastName ].some(e => e?.trim() == '' )) return res.status(404).json({message:"Please full fill the registration from"});

    // check if user already exists
    const user = await UserModel.findOne({email});
    if(user) return res.status(409).json({message:"Email already exists try another email address"});
    // create new user
    const newUser = await UserModel.create( { email , password , phone , firstName , lastName })

    res.status(200).json({message:"registation succesfull",newUser})
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email) return res.status(401).json({message:"Please enter the email address"});
    
    const user = await UserModel.findOne({ email });
    
    if(!user) return res.status(444).json({ message :"your account was not exists"});
    
    const passwordIsCorrect = await user.isPasswordCorrect(password);
    
    if(!passwordIsCorrect) return res.status(402).json({message:"Your password is incorrect"});
    
    const { accestokens , refreshtoken } = await generateAccesTokenAndRefreshTokens(user._id);

    const loggedInUser = await UserModel.findById(user._id).select("-password -refreshToken");

    const option = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accesToken",accestokens,option)
    .cookie("refreshToken" , refreshtoken , option)
    .json(
        {
            message:"Login successful",
            loggedInUser,
            accestokens,
            refreshtoken
        }
    )

}

const logout = async (req ,res) => {
    await UserModel.findByIdAndUpdate(
        req.user._id,
    {
        $set : {
            refreshToken : undefined
        },
    },
    {
        new : true
    }
)
    const options = {
    httpOnly : true,
    secure : true
}
    return res
    .status(200)
    .clearCookie("accestokens",options)
    .clearCookie("refreshtoken",options)
    .json({message:"Logged out successfully"})
}

const postProduct = async (req, res) => {
    try {
        
        const { title , description , price } = req.body;

        const image1 = req.files["image1"][0].path
        const image2 = req.files["image2"][0].path
        const image3 = req.files["image3"][0].path

        const produt = await Product.findOne({title})

        if(produt) return res.status(409).json({message:"Product with this title already exists , plese change the title"});

        if([image1,image2,image3,title,description,price].some( e => e.trim() === "" ) ) return res.status(401).json({message:"please fillup the from"});

        const uploadPic1 = await uploadOnCloudinary(image1)

        if(!uploadPic1) return res.status(502).json({message:"image 1 was not uploaded"})

        const uploadPic2 = await uploadOnCloudinary(image2)

        if(!uploadPic2) return res.status(502).json({message:"image 2 was not uploaded"})

        const uploadPic3 = await uploadOnCloudinary(image3)

        if(!uploadPic3) return res.status(502).json({message:"image 3 was not uploaded"})

        const newProduct = await Product.create(
            {
                title,
                description,
                price,
                imageUrl: [uploadPic1.url, uploadPic2.url, uploadPic3.url]
            }
        )

        if (!newProduct ) return res.status(501).json({message:"There was an error creating please try again"});

        res.status(201).json({message:"Product created successfully", newProduct});


    } catch (error) {
        console.log(error.message , "Some error in postProduct");
    }
}

const getProducts = async( req , res ) => {
    try {

        const products = await Product.find();

        res.status(200).json({products});

    } catch (error) {
        console.log(error.message , "Some error in getProducts");
    }
}

const updatedProduct = async ( req , res ) => {
    try {
        
        const { Data } = req.body

        const { title , data } = Data;

        const { field , newValue } = data;

        if (field === "price") {
            const updatedProduct = await Product.updateOne(
                {
                    title
                },
                {
                    $set : { price : newValue }
                }
            )
            return res.status(222).json({data:updatedProduct});
        }

        if (field === "description") {
           const updatedProduct = await Product.updateOne(
                {
                    title
                },
                {
                    $set : { description : newValue }
                }
            )
            return res.status(222).json({data:updatedProduct}); 
        }

        if(field === "catagory"){
            const updatedProduct = await Product.updateOne(
                {
                    title
                },
                {
                    $set : { catagory : newValue }
                }
            )
            return res.status(222).json({data:updatedProduct});
        }


    } catch (error) {
        console.log(error.message)
    }
}

const deleteProduct = async ( req, res ) => {
    try {
        
        const { title } = req.body;

        const deleteProduct = await Product.deleteOne({title});

        res.status(222).json({message:"delete produt done", data:deleteProduct});

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"Server error"})
    }
}

export { userRegister , postProduct , getProducts , updatedProduct , deleteProduct , login , logout }