const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));

//for any further routes, access from here
// router.use('/routerName', require('./routerfile'));
router.use('/posts', require('./posts'));
module.exports = router;