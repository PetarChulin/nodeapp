var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    if(req.session.loggedin){
        res.render('dashboard',{email: req.session.email, login: req.session.login})
    }else{
        res.redirect('/login');
    }

});
module.exports = router;