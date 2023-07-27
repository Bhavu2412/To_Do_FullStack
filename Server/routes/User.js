const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const userController = require('../controllers/SignupLogin');

router.post('/signup',[
    body('email').isEmail().trim().isLength({min:18}),
    body('username').trim().isLength({min : 5}),
    body('name').trim(),
    body('password').trim().isLength({min:8})
],userController.SignUp);
router.post('/login',userController.LogIn);
router.post('/forgetpassword',userController.ForgetPass);
router.post('/otpverify',userController.VerifyOtp);
router.post('/reset',userController.resetPass);

module.exports = router;