var express = require('express');
var router = express.Router();
const patientServices= require("../services/patient")

// Create patient
router.post("/",patientServices.createPatient)

//get patient
router.get('/',patientServices.getPatient)

router.patch('/:id/assign-doctor',patientServices.assignDoctor)

module.exports = router;
