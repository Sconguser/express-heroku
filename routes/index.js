var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const { isSafeFromPollution } = require('express-fileupload/lib/utilities');
dotenv.config();
process.env.JWTSECRET;

var token;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWTSECRET, { expiresIn: '30s' });
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

router.post('/', function(req,res,next){
  console.log(req.session);
  console.log(req.body?.name);
  if(req.body?.username == 'mioszek' && req.body?.password == 'paproszek'){
    token = generateAccessToken({ username: req.body.username });
    if(req.session.page_views){
      req.session.page_views++;
      res.render('index', {name:req.body?.username, title: 'Express', number:req.session.page_views, jwt:token});
    }else{
      req.session.page_views = 1;
      res.render('index', {name:req.body?.username, title: 'Express', number:req.session.page_views, jwt:token});
    }
  }else{
    throw new Error('Not logged in');
    }
});
router.post("/upload", function (req, res) {
  
  // When a file has been uploaded
  console.log('meh');
  // res.send('dupa');
  if (req.files && Object.keys(req.files).length !== 0) {
    console.log('dupa');
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
  jwt.verify(token, process.env.JWTSECRET, (err,user)=>{
    if(err) return res.send("Verification failed");
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




var lokalna_zmienna;
module.exports = router;
