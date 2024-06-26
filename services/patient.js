const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patient.model.js");
var createError = require("http-errors");

const createPatient = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.name) {
      return next(createError(400, "Name is required"));
    }
    const create = new patientModel(data);
    await create.save();
    res.status(200).json({
      data: create,
      message: "created",
    });
  } catch (error) {
    next(createError(500));
  }
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
  // const getPatients = await patientModel.aggregate([
  //     {
  //         $match: {
  //             age:{
  //                 $gt: 18
  //             }
  //         }
  //     }
  // ])

  // assignedDoctor lookup
  const getPatients = await patientModel.aggregate([
    {
      $lookup: {
        from: "doctors",
        localField: "assignedDoctor",
        foreignField: "_id",
        as: "assignedDoctor",
      },
    },
  ]);

  res.status(200).json({ data: getPatients, success: true });
};

const getPatientWithPagination = async (req, res, next) => {
  const page = +req.query.page || 1;
  const count = +req.query.count || 5;

  const getPatients = await patientModel.aggregate([
    {
      $skip: (page - 1) * count,
    },
    {
      $limit: count,
    },
    {
      $project: {
        name: 1,
        age: 1,
        disease: 1,
        assignedDoctor: 1,
      },
    },
  ]);
  res.status(200).json({ data: getPatients, success: true });
};

const getPatientWithLookup = async (req, res, next) => {
  const getPatients = await patientModel.aggregate([
    {
      $lookup: {
        localField: "assignedDoctor", // of patient model
        from: "doctors", // foreign collection (doctor model)
        foreignField: "_id", // of doctor model
        as: "assignedDoctor", // alias name
      },
    },
    {
      $project: {
        name: 1,
        age: 1,
        disease: 1,
        assignedDoctor: 1,
      },
    },
    // assignedDoctor expereince greater than 7
    {
      $match: {
        "assignedDoctor.experience": {
          $gt: 7,
        },
      },
    },
  ]);

  res.status(200).json({ data: getPatients, success: true });
};

const assignDoctor = async (req, res, next) => {
  const patientId = req.params.id;
  const doctorId = req.body.doctorId;
  const patient = await patientModel.findByIdAndUpdate(patientId, {
    assignedDoctor: new mongoose.Types.ObjectId(doctorId),
  });

  res.status(200).json({ data: patient, success: true });
};

const assignDoctorV2 = async (req, res, next) => {
  const patientId = req.params.id;
  const doctorId = req.body.doctorId;
  const patient = await patientModel.findOne({
    _id: new mongoose.Types.ObjectId(patientId),
  });

  patient.assignedDoctor = new mongoose.Types.ObjectId(doctorId);

  await patient.save();

  res.status(200).json({ data: patient, success: true });
};

module.exports = {
  createPatient: createPatient,
  getPatient: getPatientWithLookup,
  assignDoctor,
  name: "manjot",
};
