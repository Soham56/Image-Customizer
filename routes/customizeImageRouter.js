const express = require('express');
const router = express.Router();

const resizeImageController = require('../controllers/customizeImageControllerResize');
const cropImageController = require('../controllers/customizeImageControllerCrop');
const rotateImageController = require('../controllers/customizeImageControllerRotate');
const imageInfo = require('../controllers/imageInfo');

router.route('/resize').post(resizeImageController);
router.route('/crop').post(cropImageController);
router.route('/rotate').post(rotateImageController);
router.route('/imageInfo').post(imageInfo);

module.exports = router;