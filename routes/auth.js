const router = require('express').Router();
const passport = require('passport');
const passportConf = require('../config/passport');

/*
* Login User
*/
router.get('/login', (req, res) => {
    const meta = {
		page_title: 'Login Page',
		page_link: '/login'
	};
	if (req.user) return res.redirect('/login');
    res.render('./auth/login', {layout: false, meta, error: req.flash('loginMessage') });
});

module.exports = router;