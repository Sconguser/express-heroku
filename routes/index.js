var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const userModel = require("../models/user");
const pool = require("../db");

const dotenv = require('dotenv');
const { isSafeFromPollution } = require('express-fileupload/lib/utilities');
dotenv.config();
process.env.JWTSECRET;

var token;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWTSECRET, { expiresIn: '15s' });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.page_views){
    req.session.page_views++;
    res.render('index', { title: 'Express', number:req.session.page_views});
  }else{
    req.session.page_views = 1;
    res.render('index', { title: 'Express', number:req.session.page_views});
  }
 });

router.post('/', async (req,res,next)=>{
  if(req.body && req.body.username && req.body.password){
    // const newUser = await userModel.user.findUser(req.body.username, req.body.password)
    username = req.body.username;
    password = req.body.password;
    try{
      const newUser = await userModel.user.findUser(username, password);
      if(newUser != null){
        if(newUser.activated == false){
          req.flash("error", "Your account has not been activated yet");
          res.render('login', {error:req.flash('error')});
        }
        if(newUser.a)
        req.session.user = newUser;
        if(req.session.page_views){
              req.session.page_views++;
              res.render('index', {name:newUser.username, title: 'Express', number:req.session.page_views, jwt:newUser.token, user:newUser});
            }else{
              req.session.page_views = 1;
              res.render('index', {name:newUser.username, title: 'Express', number:req.session.page_views, jwt:newUser.token, user:newUser});
            }
      }else{
        console.log('error');
        req.flash("error", "There is no user with such credentials");
        res.render('login', {error:req.flash('error')});
      }
    }catch(e){
      throw (e);
    }
  }

});
router.post("/upload", function (req, res) {
  
  // When a file has been uploaded
  // res.send('dupa');
  if (req.files && Object.keys(req.files).length !== 0) {
    // Uploaded path
    const uploadedFile = req.files.uploadFile;
  
    // Logging uploading file
    console.log(uploadedFile);
  
    // Upload path
    const uploadPath = __dirname
        + "/downloads/" + uploadedFile.name;
  
    // To save the file using mv() function
    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        res.send("Failed !!");
      } else res.send("Successfully Uploaded !!");
    });
  } else res.send("No file uploaded !! sadge");
});
  
router.post("/verify", function(req,res){
  // console.log(req.session.user);
  // console.log(req.headers);
  jwt.verify(req.session.user.token, process.env.JWTSECRET, (err,user)=>{
    if(err) {

      // res.send("Verification failed");
      setTimeout(() => { 
        req.session.user = null;
        res.redirect('login') }, 5000);
      // location.assign('/login');
    } 
    else return res.send("Token successfully verified");
  });
})
// To handle the download file request
router.post("/download", function (req, res) {
  

  console.log('download');

  // The res.download() talking file path to be downloaded
  res.download(__dirname + "/downloads/phyton.txt", function (err) {
    if (err) {
      console.log(err);
    }
  });
});

// router.post("/sign_up", function(req,res){

// })




var lokalna_zmienna;
module.exports = router;
