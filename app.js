//Connecting express-async-errors to handle error in controllers
require('express-async-errors');
require('dotenv').config();

//Security Packages
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

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

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too Many Request, Try again later'
})

app.set('trust proxy',1);
app.use(limiter);
app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());

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