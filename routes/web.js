const router = require('express').Router();

/*
** Pages
*/
router.get('/', (req, res) => {
    res.render('./index');
});

module.exports = router;