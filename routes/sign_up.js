var express = require('express');
var router = express.Router();
const pool = require("../db");
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
 });

 router.post('/', async(req,res,next)=>{
    try{
      const  description  = req.body;
      description.isAdmin = req.body.isAdmin === 'on' ? true : false;
      const username = description.username;
      const isAdmin = description.isAdmin;
      const password = description.password;
      const activated = isAdmin;
      // const emailValue = "gowno.com";
      // const passwordValue = "mioszekk";
      // const isadminValue = true;
      if(username.length>0 && password.length > 0){
          const doopa = await pool.query("INSERT INTO userswithactivation(username, password, isadmin, activated) VALUES ($1, $2, $3, $4) RETURNING *", [username, password, isAdmin, activated]);
          if(doopa!=null){
            res.status(201).render('index', { title: 'Express', number:req.session.page_views});
          }
      }
      console.log(doopa);
    }catch (error) {
        console.log(error);
      }
 });


module.exports = router;