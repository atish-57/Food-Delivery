import cloudinary from 'cloudinary';
import fs from 'fs';
// import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'uploads'
        });
        fs.unlinkSync(filePath); // Remove the file from the local filesystem
        return result;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};

const deleteFromCloudinary = async (imageUrl) => {
    try {
        // Extract the public ID from the image URL
        const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        return null;
    }
};


export { uploadOnCloudinary , deleteFromCloudinary };
