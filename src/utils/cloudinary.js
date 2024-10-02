import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file has been uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // Remove the malicious files so that file uploads are not spammed to the server.
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (fileUrl) => {
  try {
    const response = await cloudinary.uploader.destroy(fileUrl, {
      resource_type: "auto",
    });

    console.log("Deleted file", response);
    return response;
  } catch (error) {
    throw new ApiError(
      401,
      "Error occurred while deleting file from cloudinary"
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
