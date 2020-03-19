var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */

router.get('/', function(req, res, next) {
  var sw
  fs.readFile(__dirname + '/switch.hbs', (err, data) => {
      if(err) {
        console.log(err)
        sw = '<h1> err </h1>'
      } else {
        console.log('data')
        console.log(data)
        sw = data
      }
  })
  res.render('index', { title: 'Express', sw: sw });
});

module.exports = router;
