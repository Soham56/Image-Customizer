const sharp = require('sharp');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const cloudinary = require('cloudinary').v2;
const { unlink } = require('fs');

const cropImage = async (req, res) => {
    const { width, height, left, top, greyScale, blur } = req.body;
    if (!req.files || !req.files.image) throw new BadRequestError('Please provide an image file !');

    const uploadedImage = req.files.image;
    const uploadedPath = uploadedImage.tempFilePath;
    const cropedPath = path.resolve(uploadedPath, `../croped-${path.basename(uploadedPath)}`);

    try {
        let cropedData = sharp(uploadedPath)
            .extract({
                width: Number(width),
                height: Number(height),
                left: Number(left),
                top: Number(top)
            })
            .greyscale(greyScale == 'true');


        if (blur && Number(blur) >= 0.3 && Number(blur) <= 1000) cropedData.blur(Number(blur));

        await cropedData.toFile(cropedPath);

        const { secure_url, bytes: cropedImageSize } = await cloudinary.uploader.upload(cropedPath, { folder: 'image_customiser_project' });

        unlink(uploadedPath, (err) => {
            if (err) {
                console.log('Opps!  Something Went Wrong.');
            }
        });
        unlink(cropedPath, (err) => {
            if (err) {
                console.log('Opps!  Something Went Wrong.');
            }
        });

        return res.status(StatusCodes.ACCEPTED).json({
            size: cropedImageSize, src: `${secure_url}`
        });

    } catch (err) {
        unlink(uploadedPath, (err) => {
            if (err) {
                console.log('Opps!  Something Went Wrong.');
            }
        });
        if (err.message.includes('bad extract area')) {
            throw new BadRequestError('😐 Wrong crop area provided !');
        }
        throw new BadRequestError('Something went wrong');
    }
}

module.exports = cropImage;