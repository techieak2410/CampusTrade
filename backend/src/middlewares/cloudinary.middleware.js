import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //college mail id used
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
});



async function uploadOnCloudinary(localFilePath) {
    try{
    // Upload an image
    console.log(process.env.CLOUDINARY_CLOUD_NAME);
        console.log("cloud:", process.env.CLOUDINARY_CLOUD_NAME)
console.log("key:", process.env.CLOUDINARY_API_KEY)
console.log("secret:", process.env.CLOUDINARY_API_SECRET)
        console.log("hello")
        console.log(localFilePath);
        if(!localFilePath) return null;
        const responseResult=await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        //on successfull upload
        console.log("file is uploaded on cloudinary");
        fs.unlinkSync(localFilePath);
        return responseResult;
    }
    catch(error){
        console.log(error)
        fs.unlinkSync(localFilePath);//remving the locally saved tempory file as the upload operatoion got failed
        console.log("couldnt upload on cloudinary");
        return null;
    }
};

export {uploadOnCloudinary}