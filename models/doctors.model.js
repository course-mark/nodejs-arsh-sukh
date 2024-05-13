var mongoose = require('mongoose');


// create doctor schema and model

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;