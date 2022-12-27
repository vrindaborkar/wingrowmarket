var bcrypt = require("bcryptjs");
const User = require('../models/User')
var jwt = require("jsonwebtoken");
const config =require('../config/auth.config')
const jwt_decode =  require("jwt-decode");
const Feedback = require("../models/Feedback");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dpxzakezm', 
  api_key: '587784988219159', 
  api_secret: 'T571dxi6AZtczKJP0KYFVmLSQuc',
  secure: true
});

exports.signup = async(req , res , next)=>{
      const {  phone , password , firstname , lastname , type , farmertype , address , tags} = req.body;
      let typeStr;
      if(type === "farmer"){
        typeStr = farmertype
      }else{
        typeStr = "none"
      }
        const user = new User({
          firstname,
          lastname,
          phone,
          password:bcrypt.hashSync(password, 8),
          role:type,
          farmertype:typeStr,
          pic:undefined,
          address,
          tags
        })
      
        const data = await user.save()
        console.log(data);
      
        if(!data){
          res.status(400).send("registration failed")
        }
  
        res.status(200).send(data)
  }
  

exports.signin = (req, res) => {
    User.findOne({
      phone: req.body.phone
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          id: user._id,
          firstname: user.firstname,
          lastname:user.lastname,
          phone: user.phone,
          role: user.role,
          accessToken: token,
          farmertype:user.farmertype,
          pic:user.pic,
          address:user.address
        });
      });
  };


  exports.postPic = async(req,res) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    const file = req.files.photo
    const data = await cloudinary.uploader.upload(file.tempFilePath);

    if(data){
      const response = await User.findByIdAndUpdate({_id : id} , {pic : data.secure_url})

      if(!response){
        res.status(400).json("something went wrong")
      }

      res.status(200).send(response)
    }
    else{
      res.status(400).json("something went wrong")
    }
  }


  exports.addAddress = async(req,res) => {
    const {address} = req.body
    try {
      let token = req.headers["x-access-token"];
      const { id } = jwt_decode(token)

      if (!address) {
        res.json({
          success: false,
          message: "Please provide valid address"
        });
      } else {

        const data = await User.findByIdAndUpdate({_id : id} , {address : address})
        if(data){
          res.status(200).json(data)
        }
        else{
          res.status(400).json("something went wrong")
        }
      }
    } catch (error) {
      console.error(error);
    res.status(500).send("Server Error");
    }
  }


exports.feedback=async(req,res)=>{
  const {  message , stars} = req.body;
  const feedback = new Feedback({
    stars,
    message
  })
  const data = await feedback.save()
  res.status(200).send(feedback);
}

exports.newpassword = async(req,res) => {
  const {phone , password} = req.body
  const user = await User.findOne({
      phone: phone,
  });  
  user.password = bcrypt.hashSync(password, 8),
  await user.save();
  res.status(200).send(user);

}