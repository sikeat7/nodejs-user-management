const router = require('express').Router();
const passport = require('passport');
const passportConf = require('../config/passport');
const {User} = require('./../app/models/user');
const authenticate = require('./../app/middleware/authenticate');

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

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/users/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

/*
* Register
*/
router.get('/register', (req, res) => {
    const meta = {
		page_title: 'Register Page',
		page_link: '/register'
	};
	// if (req.user) return res.redirect('/login');
    res.render('/auth/register', {layout: false, meta, message: req.flash('signupMessage') });
});

router.post('/register', passport.authenticate('local-signup', {
	successRedirect: '/users/profile',
	failureRedirect: '/register',
	failureFlash: true
}));

module.exports = router;