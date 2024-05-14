var express = require('express');
var router = express.Router();
const doctors= require('../services/doctor')

//create doctors
router.post('/',doctors.createDoctor)

//get doctors

router.get('/',doctors.getDoctor)
module.exports = router;