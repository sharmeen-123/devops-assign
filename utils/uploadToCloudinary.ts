const fs = require("fs");
const cloudinary = require("cloudinary");

export default async function uploadToCloudinary(locaFilePath) {
  cloudinary.config({
    cloud_name: 'dyapmvalo',
    api_key: '799719869373998',
    api_secret: 'LhU3V8GcPLCWcVmd_zmzPDPg_Go'
  });
  // locaFilePath :
  // path of image which was just uploaded to "uploads" folder
  var mainFolderName = "main";
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;
  // filePathOnCloudinary :
  // path of image we want when it is uploded to cloudinary
  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on cloudinary
      // So we dont need local image file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
}
