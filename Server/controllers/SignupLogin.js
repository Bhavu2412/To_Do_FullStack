const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();


exports.SignUp = (req, res, next) => {
    let saveU;
    const err = validationResult(req);
    if (!err.isEmpty()) {
        const err = new Error('Validation failed!!!');
        err.statusCode = 422;
        throw err;
    }
    const username = req.body.username;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    User.findOne({email : email})
    .then(user=>{
        if(user){
        const err = new Error('User witht the emailId Exists! Please try with other email.');
        err.statusCode = 422;
        throw err;
        }
        return User.findOne({username : username})

    })
    .then(user=>{
        if(user){
        const err = new Error('User witht the username Exists!. please try with other username.');
        err.statusCode = 422;
        throw err;
        }
        return bcrypt.hash(password, 12);
    })
    .then(hashedPwd => {
        const user = new User({
            name: name,
            email: email,
            password: hashedPwd,
            username: username
        });
        saveU = user;
        return user.save();
    }).then(result => {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : 'nodetutcomplete@gmail.com',
                pass : 'myxqbccuwoehzddg'
            }
        })
        const mailOption = {
            from :'nodetutcomplete@gmail.com',
            to: email,
            subject :'Signup Successfull!!!',
            
            html:`<div 
            padding:10px;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;">
            <h1> Welcome to AppName! 🎉</h1>
                <p>Dear ${name},Congratulations and a warm welcome to AppName! We are thrilled to have you as part of our growing community. This email is to confirm your successful registration. We hope you enjoy with the website. For any query please feel free to email on this mail.</p>        
                    <h2>Your account details:</h2>
                    <h2>Name: ${name}</h2>
                    <h2>Email: ${email}</h2>
            </div>`
        }
        transporter.sendMail(mailOption , (err,info)=>{
            if(err){
                console.log(err);
            }
        });

        res.status(200).json({ message: 'User created successfully', user: saveU });
        
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.LogIn = (req, res, next) => {
    let luser,token,passlen;
    const searchQuery = {
        $or: [
          { username: req.body.username },
          { email: req.body.email},    
        ],
      }
    
    const password = req.body.password;
    User.findOne(searchQuery)
        .then(user => {
            if (!user) {
                const err = new Error('User donot exist');
                err.statusCode = 404;
                throw err;
            }
            luser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const err = new Error('Password donot match');
                err.statusCode = 404;
                throw err;
            }
             token = jwt.sign({
                email : luser.email,
                userId : luser._id,
                name : luser.name,
            },
                process.env.SECRET_KEY, { expiresIn: '1d' });
            
        })
        .then(result => {
            res.status(200).json({ message: 'User logged in!!!', user_name:luser.name , email : luser.email , username: luser.username , passlen : password.length , token:token})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.ForgetPass = (req, res, next) => {
    const otp = Math.floor(Math.random() * 1000000);
    const email = req.body.email;
    console.log(email);
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const err = new Error('No user found!!!');
                err.statusCode = 404;
                throw err;
            }
            user.otp = otp;
            user.otpExpire = new Date().getTime() + 300 * 1000;
            console.log(otp);
            return user.save();
        })
        .then(result => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nodetutcomplete@gmail.com',
                    pass: 'myxqbccuwoehzddg'
                }
            });

            const mailOptions = {
                from: 'nodetutcomplete@gmail.com',
                to: email,
                subject: 'Password is a secret to be kept to yourself only.',
                html: `<h1>You have forgotten your password. Here is your OTP: ${otp}</h1>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ message: 'Email send successfully. Please check your mail' })
                }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });


}

exports.VerifyOtp = (req, res, next) => {
    const { otp, email } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const err = new Error('User donot exist');
                err.statusCode = 404;
                throw err;
            }

            const time = new Date().getTime() * 1000;
            console.log(time);
            if (time < user.otpExpire) {
                const err = new Error('Otp expeired');
                err.statusCode = 404;
                throw err;
            }
            if (!otp) {
                res.status(404).json({ message: 'No otp found' });
            }
            else if (otp == user.otp) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'nodetutcomplete@gmail.com',
                        pass: 'myxqbccuwoehzddg'
                    }
                });
    
                const mailOptions = {
                    from: 'nodetutcomplete@gmail.com',
                    to: email,
                    subject: 'Password is a secret to be kept to yourself only.',
                    html: `<h1>Your password has been changed successfully.</h1>`
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).json({ message: 'Email send successfully' })
                    }
                });
                return res.status(200).json({ message: "Otp verified" });
            }
            else{
                const err = new Error('Otp donot match!!!');
                err.statusCode = 404;
                throw err;
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err);
        })
}

exports.resetPass = (req, res, next) => {
    let luser;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const err = new Error('User donot exist');
                err.statusCode = 404;
                throw err;
            }
            luser = user;
            return bcrypt.compare(password, user.password)
        }).then(isEqual => {
            if (isEqual) {
                const error = new Error('Password is same as the old password. Enter new password');
                error.statusCode = 404;
                throw error;
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPass => {
            luser.password = hashedPass;
            return luser.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User Password updated!!!' });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 404;
            }
            next(err);
        })
}