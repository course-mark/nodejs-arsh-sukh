const doctorModel = require("../models/doctors.model.js");
const createDoctor = async (req, res, next) => {
  const data = req.body;
  const create = new doctorModel(data);
  await create.save();
  res.status(200).json({
    data: create,
    message: "created",
  });
};

const getDoctor = async (req, res, next) => {
  const getDoctor= await doctorModel.find()
  res.status(200).json(
      {data:getDoctor,
          success:true
      
})};

module.exports = { 
    createDoctor,getDoctor
 };
