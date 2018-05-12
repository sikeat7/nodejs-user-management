const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('Hello World');
    res.render('./index');
});


router.get('/users', (req, res) => {
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

	res.render('users', {users});
});

module.exports = router;