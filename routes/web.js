const router = require('express').Router();

router.get('/', (req, res) => {
    const meta = {
		page_title: 'Home Page',
		page_link: '/'
	};
    res.render('./index', {meta});
});


router.get('/users', (req, res) => {
	const meta = {
		page_title: 'User Management',
		page_link: '/users'
	};

	const users = [{
		first_name: 'Andrew',
		last_name: 'Kevin',
		mob_no: '02342341',
		email: 'andrew.kevin@gmail.com'
	},{
		first_name: 'Sak',
		last_name: 'Sorrow',
		mob_no: '02342341',
		email: 'andrew.kevin@gmail.com'
	},{
		first_name: 'Lee',
		last_name: 'Chin',
		mob_no: '02342341',
		email: 'andrew.kevin@gmail.com'
	},{
		first_name: 'Min',
		last_name: 'Lee',
		mob_no: '02342341',
		email: 'andrew.kevin@gmail.com'
	},{
		first_name: 'Andrew',
		last_name: 'Kevin',
		mob_no: '02342341',
		email: 'andrew.kevin@gmail.com'
	}];

	res.render('users', {users, meta});
});

module.exports = router;