const patientModel = require("../models/patient.model.js");
const createPatient = async (req, res, next) => {
  const data = req.body;
  const create = new patientModel(data);
  await create.save();
  res.status(200).json({
    data: create,
    message: "created",
  });
};

const getPatient = async (req, res, next) => {
  const getPatient= await patientModel.find()
  res.status(200).json(
      {data:getPatient,
          success:true
      
})};

module.exports = { 
    createPatient: createPatient,
    getPatient: getPatient,
    name:"manjot"
 };
