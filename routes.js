
const express = require('express');
const router = express.Router();


const notifyUsersController = require('./Controllers/NotifyUsers')






router.post('/NotifyUsers', notifyUsersController.NotifyUsers); // UploadFile [ payload validation pending ]  - POSTMAN TESTING PENDING



module.exports = router;
