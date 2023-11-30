# Image Crafter
### [View Live Project](https://imagecrafter.onrender.com/)
Welcome to Image Crafter, a web application powered by Node.js and Express.js that allows you to resize, crop, and rotate your images effortlessly. With the integration of Sharp for image manipulation, Cloudinary for cloud storage, and various security measures, this tool ensures a seamless and secure customization experience.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Security](#security)
- [Deployment](#deployment)

## Features
- **Image Manipulation:** Resize, crop, and rotate your images according to your preferences.
- **Cloud Storage:** Utilize Cloudinary to save and retrieve your customized images securely.
- **Security Measures:** Implemented security packages such as Helmet, CORS, and Express Rate Limiter to prevent vulnerabilities.
- **User-friendly Interface:** Simple and intuitive web interface for easy image customization.

## Getting Started

### Prerequisites
- Node.js installed on your machine
- Cloudinary API key and credentials

### Installation
1. Clone the repository: `git clone https://github.com/Soham56/Image-Customizer.git`
2. Navigate to the project directory: `cd Image-Customizer`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and add your Cloudinary API key and credentials:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## Usage
1. Run the application: `npm start`
2. Visit [http://localhost:3000](http://localhost:3000) in your web browser.
3. Upload an image and choose customization options (resize, crop, or rotate).
4. Retrieve the customized image using the provided API endpoints.

## API Endpoints
- `/api/v1/resize`: Resize the uploaded image.
- `/api/v1/crop`: Crop the uploaded image.
- `/api/v1/rotate`: Rotate the uploaded image.
- `/api/v1/imageInfo`: Retrieve information about the uploaded image.

## Project Structure
- **app.js:** Main application file.
- **public:** Folder for serving assets, HTML, CSS, and client JS files to the home route.
- **routes:** Handles all API routes.
- **controllers:** Logic for converting an image is written here.
- **errors:** Defines `BadRequestError` and `NotFoundError` classes.
- **middlewares:** Contains error-handling middleware and route-does-not-exist JS files.

## Dependencies
- Express.js
- Sharp
- Cloudinary
- express-fileuploader
- Helmet
- CORS
- express-rate-limiter

## Security
- Utilizes Helmet for securing HTTP headers.
- Implements CORS to control cross-origin resource sharing.
- Express Rate Limiter prevents abuse and potential attacks.

## Deployment
The project is deployed using Render and can be accessed globally at [Live Project](https://imagecrafter.onrender.com/).

