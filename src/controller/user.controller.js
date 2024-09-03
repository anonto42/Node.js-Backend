import { Product } from '../Model/postProduct.model.js';
import { uploadOnCloudinary } from '../util/cloudinary.js';
import{ UserModel} from './../Model/user.model.js';


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

export { userRegister , postProduct , getProducts , updatedProduct , deleteProduct}