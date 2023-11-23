//Connecting express-async-errors to handle error in controllers
require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const PORT = process.env.PORT || 3000;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECREAT,
    secure: true
});


//Express Inbuild middleware for accessing json requests
app.use(express.json());
//Express Inbuild middleware for accessing file requests
app.use(expressFileUpload({useTempFiles: true}));

//Error Handler Middlware
const errorHandlerMiddleware = require('./middlewares/errorHandler');
// Route Does Not Exists Middlware
const routeNotFound = require('./middlewares/notFoundRoute');

//All required routes /resize, /crop, /rotate
const routes = require('./routes/customizeImageRouter');

//Serving the front page for home route
app.use(express.static('public'));

//Handling all routes prefixing /api/v1
app.use('/api/v1/', routes);

// Enabling Error Handle middleware
app.use(errorHandlerMiddleware);
// Enabling Not Found Route middleware
app.use(routeNotFound);


//Listening for perticular port
app.listen(PORT,(error)=>{
    if(error) throw error;
    console.log(`Server is listening on PORT ${PORT}`);
});