var express = require('express');
var router = express.Router();
var message = null;
var messages = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chat_insert');
});

router.get('/conversation', function(req, res, next) {
  messages.push(req.query.message);
  res.render('chat', { 
    message: messages,
   });
});

router.post('/send_message', function(req, res, next) {
    message = req.body.message;
    res.redirect(`/chat/conversation?message=${message}`);
})

module.exports = router;
