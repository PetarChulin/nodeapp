var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res) {
    if(req.session.loggedin){
        res.render('dashboard',{email: req.session.email, login: req.session.login})
    }else{
        res.redirect('/login');
    }

});
module.exports = router;