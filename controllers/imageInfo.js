const sharp = require('sharp');
const path = require('path');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');
const {unlinkSync} = require('fs');

const imageInfo = async (req, res)=>{
    if(!req.files || !req.files.image) throw new BadRequestError('Please provide an image file !');
    const uploadedImage = req.files.image;
    const uploadedPath = uploadedImage.tempFilePath;

    const {width, height} = await sharp(uploadedPath).metadata();
    unlinkSync(uploadedPath);

    return res.status(StatusCodes.ACCEPTED).json({width,height});
}

module.exports = imageInfo;