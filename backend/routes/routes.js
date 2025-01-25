const express = require('express');
const router = express.Router();
const {
    createForm,
    updateForm,
    deployForm,
    getForm,
    deleteForm,
    getForms,
    getFormAuthorId,
} = require('../controllers/formController');
const {
    getUserProfile,
    updateUserProfile,
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/userController');
const { submitForm } = require('../controllers/submissionController');
const { authenticate } = require('../middlewares/authMiddleware');
const { decodeToken } = require('../middlewares/tokenDecodeMiddleware');
const verifyOtp = require('../controllers/otpController');
const { getClientResponse,getFormResponses } = require('../controllers/responseController');


// Form routes
router.post('/form', authenticate, createForm);
router.put('/form/:formId', authenticate, updateForm);
router.put('/form/deploy/:formId', authenticate, deployForm);
router.get('/form/formAuthorId/:formId',getFormAuthorId)
router.get('/form/:formId', getForm);
router.delete('/form/:formId', authenticate, deleteForm);
router.get('/forms',authenticate, getForms)

// User routes
router.get('/profile', authenticate, getUserProfile);
router.put('/updateProfile', authenticate, updateUserProfile);
router.post('/register',authenticate, registerUser);
router.post('/login',authenticate, loginUser);
router.get('/logout', authenticate, logoutUser);

//Otp routes
router.post('/verify-otp',verifyOtp)

// Submission routes
router.post('/submitForm/:formId', submitForm);

// Responses routes
router.get('/clientResponse/:submissionId',getClientResponse);
router.get('/getFormResponses/:formId', authenticate, getFormResponses);

module.exports = router;
