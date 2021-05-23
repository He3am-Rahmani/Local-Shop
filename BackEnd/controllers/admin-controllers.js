const Mongoose = require("mongoose");
const AdminModel = require("../models/AdminModels");

const loginAdmin = async (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  let admin;

  admin = await AdminModel.findOne({ userName: userName, password: password });

  //   admin = await AdminModel.find({});

  res.json({ message: "Ok", data: admin })
};
const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;

  admin = await AdminModel.findById(id);

  //   admin = await AdminModel.find({});

  res.json({ message: "Ok", data: admin });
};

const createAdmin = (req, res, next) => {
  if ((req.params.key = process.env.API_KEY)) {
    res.json({ message: "your access denied, operation failur" });
  }

  const newAdmin = new AdminModel({
    name: req.body.name,
    role: req.body.role,
    userName: req.body.userName,
    password: req.body.password,
  });

  newAdmin.save();
  res.json({ message: "Created " });
};

exports.getAdmin = loginAdmin;
exports.createAdmin = createAdmin;
exports.getAdminById = getAdminById;
