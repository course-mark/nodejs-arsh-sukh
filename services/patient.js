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

// const getPatient = async (req, res, next) => {
//   const getPatient = await patientModel.find();
//   const adultPatients = getPatient.filter((patient) => patient.age <= 18); // un-optimized
//   res.status(200).json({ data: adultPatients, success: true });
// };

const getPatientWithAgeAggregation = async (req, res, next) => {
    // to get all patients with age 18
    // const getPatients = await patientModel.aggregate([
    //     {
    //         $match: {
    //             age:{
    //                 $eq: 18
    //             }
    //         }
    //     }
    // ])

    // to get all patients with age less than 18
    // const getPatients = await patientModel.aggregate([
    //     {
    //         $match: {
    //             age:{
    //                 $lt: 18
    //             }
    //         }
    //     }
    // ])

    // to get all patients with age less than or equal to 18
    // const getPatients = await patientModel.aggregate([
    //     {
    //         $match: {
    //             age:{
    //                 $lte: 18
    //             }
    //         }
    //     }
    // ])

    // to get all patients with age greater than 18
    const getPatients = await patientModel.aggregate([
        {
            $match: {
                age:{
                    $gt: 18
                }
            }
        }
    ])
 
    
    res.status(200).json({data:getPatients,success:true})
}

const getPatient = async (req, res, next) => {
    const page = +req.query.page || 1;
    const count = +req.query.count || 5;

    const getPatients = await patientModel.aggregate([
        {
            $skip: (page - 1) * count
        },
        {
            $limit: count
        },
        {
            $project: {
                name: 1,
                age: 1,
                disease: 1
            }
        }
    ])
    res.status(200).json({data:getPatients,success:true})
}

module.exports = {
  createPatient: createPatient,
  getPatient: getPatient,
  name: "manjot",
};
