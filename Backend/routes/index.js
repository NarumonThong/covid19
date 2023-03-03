const router = require('express').Router();

router.use('/covid', require('./covid'));

module.exports = router;