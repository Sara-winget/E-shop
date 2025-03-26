const express = require('express');
const { upload } = require('../multer');
const User = require('../model/user');
const path = require('path');
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler.js');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mail');
const sendToken = require('../utils/jwtToken'); 
const {isAuthenticated}=require('../middleware/auth.js')



const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
   try{ const { name, email, password } = req.body;

    // Check if the user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        if (req.file) {
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
       
        return next(new ErrorHandler("User already exists", 400));
    }
    if (!req.file) {
        return next(new ErrorHandler("No file uploaded", 400));
    }
    // Get the uploaded file information
    const fileName = req.file.filename;

    // Assuming files are uploaded in an 'uploads' directory
    const fileUrl = path.join(__dirname, '..', 'uploads', fileName);  // Adjust path accordingly

    // Create the new user object
    const user = {
        name: name,
        email: email,
        password:password,
        avatar: {
             id: fileName,  // You can store filename as ID (or use cloud storage)
        url: `/uploads/${fileName}`
        }
    };
    console.log(user)
const activationToken = createActivationToken(user)
const activationUrl=`${process.env.FRONTEND_URL}/activation/${activationToken}`

try{
await sendMail({
    email:user.email,
    subject:"Activate your account",
    message:`hello ${user.name} click on the link to activate your account ${activationUrl}`
})
res.status(201).json({
    success:true,
    message:"Account created successfully, please check your email to activate your account"
})}
catch(error){
    return next(new ErrorHandler(error.message,500))

}}
     catch (error) {
         return next(new ErrorHandler(error.message, 400));
     }
});

const createActivationToken = (user) => {
 //   const payload = { user };
    return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: 300 });
}



router.post("/activate", async (req, res, next) => {
try{
    const {activationToken}=req.body
    console.log(activationToken)
const newUser=jwt.verify(activationToken,process.env.ACTIVATION_SECRET)
if(!newUser){
    return next(new ErrorHandler("Invalid token or token expired",400))
}
const {name,email,password,avatar}=newUser
let users = await User.findOne({email})
if(users)
    return next(new ErrorHandler("User already exist",400))
const user=await User.create({
    name,
    email,
    password,
    avatar


})

sendToken(user,200,res)}
catch(error){
    return next(new ErrorHandler(error.message,500))
}

})


router.post('/login-user' , async(req,res,next)=>{
    try{
        const {email, password}= req.body
        if(!email|| !password)
            return next(new ErrorHandler("all the fields are required",400))
   const user = await User.findOne({email}).select("password")
if(!user)
return next(new ErrorHandler("user dosent exist",400))
const isPasswordValid = await user.comparePassword(password)
if(!isPasswordValid)
    return next(new ErrorHandler("please provide correct information",400))
sendToken(user,201,res)
    }

    
    catch(e){
    return next(new ErrorHandler(e.message,500))}
})




router.get('/getuser',isAuthenticated, async(req,res,next)=>{
    try{
     const user = await User.findById(req.user.id)
     if(!user){
        return next(new ErrorHandler("User dosent exist",400))
     }
      res.status(200).json({
        success:true,
        user,
      }) 
    }
    catch(error){
        return next(new ErrorHandler(error.message,500))
    }
})



router.get("/profile",async (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        // return next(new ErrorHandler("Please provide an email", 400));
        res.status(400).send('provide email')
    }
    const user = await User.findOne({ email });
    if (!user) {
        // return next(new ErrorHandler("User not found", 404));
        res.status(400).send('user not exist')
    }
    res.status(200).json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatarUrl: user.avatar.url
        },
        addresses: user.address,
    });
});

router.post("/add-address",async (req, res, next) => {
    try{
    const { country, city, address1, address2, zipCode, addressType, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        // return next(new ErrorHandler("User not found", 404));
        res.status(400).send('user not there')
    }

    const newAddress = {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
    };

    user.address.push(newAddress);
    await user.save();

    res.status(201).json({
        success: true,
        addresses: user.address,
    });}
    catch(e){
        res.status(500).send(e.message)
    }
});

router.get("/addresses", async(req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        addresses: user.address,
    });
}
);
module.exports = router;
