var express = require('express');
const { user } = require('pg/lib/defaults');
var router = express.Router();
const pool = require("../db");
router.get('/', async (req, res, next)=> {
    notActivatedUsers = await pool.query("SELECT id, username, activated from userswithactivation where isadmin=false and activated=false");
    console.log(notActivatedUsers);
    res.render('adminpanel', {notActivatedUsers: notActivatedUsers.rows});
  });
router.post('/activate', async(req,res,next)=>{
  x = await pool.query("UPDATE userswithactivation SET activated=($1) WHERE id=($2)", [true, req.body.id]);
  res.redirect('back');
})
  module.exports = router;