const AdminModel = require("../models/AdminModels");

const loginAdmin = async (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  let admin;

  admin = await AdminModel.findOne({ userName: userName, password: password });

  const admins = await AdminModel.findOne({});

  if (admin) {
    res.json({
      message: "Ok",
      data: { role: admin.role, id: admin.id, userName: admin.userName },
    });
  } else {
    res.json({
      message: "Not Valid Data",
      data: admins,
      type: "failed",
    });
  }
};
const getAllAdmins = async (req, res, next) => {
  if (req.body.key === process.env.API_KEY) {
    let Admins;
    Admins = await AdminModel.find({});

    res.json({ message: "OK", data: Admins });
  } else {
    res.json({
      message: "key is not correct your access denied, operation failur",
    });
  }
};
const getAdminById = async (req, res, next) => {
  const id = req.params.id;
  const admin = await AdminModel.findById(id);

  if (admin) {
    res.json({ message: { message: "Ok", type: "success" }, data: admin });
  } else {
    res.json({
      message: { message: "Id Is Not Correct", type: "failed" },
    });
  }
};

const deleteAdmin = async (req, res, next) => {
  if (req.body.key === process.env.API_KEY) {
    const admin = await AdminModel.findOne({ userName: req.body.userName });
    const controllerAdmin = await AdminModel.findOne({
      userName: req.body.controllerAdmin,
    });
    if (admin) {
      if (
        (controllerAdmin.role === "Head Admin" && admin.role === "Admin") ||
        controllerAdmin.role === "Senior Admin"
      ) {
        if (controllerAdmin.userName !== admin.userName) {
          await AdminModel.deleteOne({ userName: req.body.userName });
          res.json({
            message: {
              message: `${req.body.userName} Removed From Admin List`,
              type: "success",
            },
          });
        } else {
          res.json({
            message: {
              message: "You Cant Remove Yourself XD",
              type: "failed",
            },
            data: {},
          });
        }
      } else {
        res.json({
          message: {
            message: "You Cant Remove Admins With Same Or Higher Role",
            type: "failed",
          },
          data: {},
        });
      }
    } else {
      res.json({ message: { message: "Not EXist", type: "failed" }, data: {} });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

const createAdmin = async (req, res, next) => {
  if (req.body.key === process.env.API_KEY) {
    if (await AdminModel.findOne({ userName: req.body.userName })) {
      res.json({
        message: {
          message: "Operation Failure This UserName Already Taken",
          type: "failed",
        },
      });
    } else {
      const newAdmin = new AdminModel({
        name: req.body.name,
        role: req.body.role,
        userName: req.body.userName,
        password: req.body.password,
        createdBy: req.body.createdBy,
        creatorRole: req.body.creatorRole,
      });

      await newAdmin.save();
      res.json({ message: { message: "Admin Created", type: "success" } });
    }
  } else {
    res.json({
      message: {
        message: `Operation Failure There Is Something Wrong `,
        type: "failed",
      },
    });
  }
};

exports.getAdmin = loginAdmin;
exports.createAdmin = createAdmin;
exports.getAdminById = getAdminById;
exports.getAllAdmins = getAllAdmins;
exports.deleteAdmin = deleteAdmin;
