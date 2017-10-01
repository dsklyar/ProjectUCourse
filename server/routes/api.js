const express = require('express');
const router = express.Router();
const path = require('path');

// remove later 
//var User = require('../../models/user');

/* GET api listing. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;