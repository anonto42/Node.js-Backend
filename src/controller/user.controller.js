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
        
        const {} = req.body;

        
    } catch (error) {
        console.log(error.message , "Some error in postProduct");
    }
}

export { userRegister , postProduct }