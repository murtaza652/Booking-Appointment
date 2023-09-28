const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getUser);
router.post('/',adminController.postAddUser);

module.exports = router;