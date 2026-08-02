import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary,config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
})

const  uplaodOnCloudinary = async (localFilePath) => {
    try{
        if(!localfilePath) return null;
        // uplaod the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        // file has been uploaded successfully
        console.log('File uploaded to Cloudinary:', response.url);
        return response;
    } catch (error) {
       fs.unlinkSync(localFilePath);
       // remove the locally saved temparary file as the uplaod opration got failed
       console.error('Error uploading to Cloudinary:', error);
        return null;
    }
}

export default uplaodOnCloudinary;