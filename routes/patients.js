var express = require('express');
var router = express.Router();
const patientServices= require("../services/patient")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create patient
router.post("/",patientServices.createPatient)
module.exports = router;
