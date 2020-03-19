var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
/* GET home page. */
var sw
fs.readFile('views/switch.hbs', (err, data) => {
    if(err) {
      console.log(err)
      sw = '<h1> switch moduule couldnt load </h1>'
    } else {
      sw = data
    }
})

router.get('/', function(req, res, next) {
 
  res.render('index', { title: 'Express', sw: sw });
});

module.exports = router;
