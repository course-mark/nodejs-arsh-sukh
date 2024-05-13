var mongoose = require('mongoose');


// create patient schema and model

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    assignedDoctor: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Doctor',
    },
    contact: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;