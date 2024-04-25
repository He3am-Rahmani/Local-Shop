const TockenModel = require("../models/TockenModel");
const hasha = require("hasha");
const AdminModel = require("../models/AdminModels");
const { async } = require("hasha");

const createNewTocken = async (req, res, next) => {
  if (
    req.body.admin &&
    req.body.key &&
    req.body.apiKey === "WHO_THE_HELL_IS_NO1"
  ) {
    const NewTocken = new TockenModel({
      url: hasha(req.body.key) + Math.floor(Math.random().toString()) * 10000,
      isValid: true,
      for: { id: req.body.admin },
      createdDate: Date.now().toString(),
    });

    await NewTocken.save();

    res.json({ tocken: NewTocken });
  } else {
    res.json({ message: { message: "Not Valid Request", type: "failed" } });
  }
  next();
};

const getTockenByUrl = async (req, res, next) => {
  if (req.body.url) {
    const tocken = await TockenModel.findOne({ url: req.body.url });
    if (tocken) {
      if (tocken.isValid) {
        // res.json({data:tocken})
        const admin = await AdminModel.findById(tocken.for.id);
        res.json({
          message: { message: "Admin Info", type: "success" },
          data: admin,
          tocken: tocken,
        });
        // await tocken.update({ isValid: false, usedIn: Date.now().toString() });
      } else {
        res.json({
          message: {
            message: "Tocken Is Not Valid Login Again",
            type: "failed",
          },
        });
      }
    } else {
      res.json({
        message: {
          message: "Token Not Found",
          type: "redirect",
          to: "/admin/login/",
        },
      });
    }
  } else {
    res.json({
      message: {
        message: "Please Redirect To Admin/Login",
        type: "redirect",
        to: "/admin/login/",
      },
    });
  }
  next();
};

const setTockenExpire = async (req, res, next) => {
  if (req.params.url) {
    await TockenModel.findOneAndUpdate(
      { url: req.params.url },
      { isValid: false, usedIn: Date.now().toString() }
    );
    res.json({
      message: { message: "Tocken expired successfully", type: "success" },
    });
  } else {
    res.json({ message: { message: "Failed", type: "failed" } });
  }
  next();
};

exports.setTockenExpire = setTockenExpire;
exports.createNewTocken = createNewTocken;
exports.getTockenByUrl = getTockenByUrl;
