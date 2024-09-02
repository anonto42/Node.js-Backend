import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


;(function() {

    cloudinary.config({ 
        cloud_name: "ddsnont4o", 
        api_key: "711779614851591", 
        api_secret: "x68yEMTpaY0pyrLXDHKZHv-XCQk"
    });

})();


const uploadOnCloudinary = async (LocalFileImageOrVideo) =>{
    try {
        if (!LocalFileImageOrVideo) return console.log("File is not come on cloudinary")

        const response = await cloudinary.uploader.upload(LocalFileImageOrVideo,
            {
                resource_type:"auto"
            }
        )
        .catch(err => console.error(err))

        if(!response) return console.log("File was not uploaded")

        fs.unlinkSync(LocalFileImageOrVideo)

        return response;

    } catch (error) {
        fs.unlinkSync(LocalFileImageOrVideo);
        return error ;
    }
}


export { uploadOnCloudinary };