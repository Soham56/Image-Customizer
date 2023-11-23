const sharp = require('sharp');
const path = require('path');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');
const cloudinary = require('cloudinary').v2;
const {unlinkSync} = require('fs');

const rotateImage = async (req, res)=>{
    const {angle:rotateAngle, backgroundcolor:backgroundColor, greyScale, blur} = req.body;
    if(!req.files || !req.files.image) throw new BadRequestError('Please provide an image file !');

    const uploadedImage = req.files.image;
    const uploadedPath = uploadedImage.tempFilePath;
    const rotatedPath = path.resolve( uploadedPath,`../rotated-${path.basename(uploadedPath)}`);

    let rotatedData = sharp(uploadedPath)
    .rotate(Number(rotateAngle), {background: backgroundColor})
    .greyscale(greyScale=='true');

    if(blur && Number(blur)>=0.3 && Number(blur)<=1000) rotatedData.blur(Number(blur));

    await rotatedData.toFile(rotatedPath);

    const {secure_url, bytes:resizedImageSize} = await cloudinary.uploader.upload(rotatedPath,{folder:'image_customiser_project'});

    unlinkSync(uploadedPath);
    unlinkSync(rotatedPath);

    res.status(StatusCodes.ACCEPTED).json({
        size:resizedImageSize,src:`${secure_url}`
    })
}

module.exports = rotateImage;