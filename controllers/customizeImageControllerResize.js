const sharp = require('sharp');
const path = require('path');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');
const cloudinary = require('cloudinary').v2;
const {unlink} = require('fs');

const resizeImage = async (req, res)=>{
    let {width:imageWidth, height:imageHeight, aspectratio:aspectRatio, compression, greyScale, blur} = req.body;
    if(!req.files || !req.files.image) throw new BadRequestError('Please provide an image file !');

    if(imageWidth<0) {
        unlink(uploadedPath, (err)=>{if(err){console.log('Opps!  Something Went Wrong.')}});
        throw new BadRequestError('Width must be positive !');
    }
    if(imageHeight && imageHeight<0) {
        unlink(uploadedPath, (err)=>{if(err){console.log('Opps!  Something Went Wrong.')}});
        throw new BadRequestError('Height must be positive');
    }

    const uploadedImage = req.files.image;
    const uploadedPath = req.files.image.tempFilePath;
    const resizedPath = path.resolve(uploadedPath,`../resized-${path.basename(uploadedPath)}`);

    let resizedData = sharp(uploadedPath);
    if(aspectRatio=='true'){
        resizedData = resizedData.resize({width:Number(imageWidth)});
    }
    else{
        if(!imageHeight){
            throw new BadRequestError('Height must provied !')
        }
        resizedData = resizedData.resize({width:Number(imageWidth),height:Number(imageHeight)});
    }
    
    resizedData = resizedData.toFormat('jpeg', {
        mozjpeg: compression=='true'
    })
    .greyscale(greyScale=='true')

    if(blur && Number(blur)>=0.3 && Number(blur)<=1000) resizedData.blur(Number(blur));

    await resizedData.toFile(resizedPath);

    const {secure_url, bytes:resizedImageSize} = await cloudinary.uploader.upload(resizedPath,{folder:'image_customiser_project'});
    
    unlink(uploadedPath, (err)=>{
        if(err){
            console.log('Opps!  Something Went Wrong.');
        }
    });
    unlink(resizedPath, (err)=>{
        if(err){
            console.log('Opps!  Something Went Wrong.');
        }
    });

    res.status(StatusCodes.ACCEPTED).json({
        size:resizedImageSize,src:`${secure_url}`
    });
}

module.exports = resizeImage;