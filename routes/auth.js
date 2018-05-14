const router = require('express').Router();

router.get('/login', (req, res) => {
    const meta = {
		page_title: 'Login Page',
		page_link: '/login'
	};
    res.render('./auth/login', {layout: false, meta});
});

module.exports = router;