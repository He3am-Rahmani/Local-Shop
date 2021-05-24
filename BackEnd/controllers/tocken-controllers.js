const TockenModel = require("../models/TockenModel");
const hasha = require("hasha");
const AdminModel = require("../models/AdminModels");

const createNewTocken = async (req, res, next) => {
  if (req.body.admin && req.body.key) {
    const NewTocken = new TockenModel({
      url: hasha(req.body.key) + Math.floor(Math.random().toString()) * 10000,
      isValid: true,
      for: req.body.admin,
      createdDate: Date.now().toString(),
    });

    await NewTocken.save();

    res.json({ url: NewTocken.url });
  } else {
    res.json({ message: { message: "Not Valid Request", type: "failed" } });
  }
};

const getTockenByUrl = async (req, res, next) => {
  if (req.body.url) {
      const tocken = await TockenModel.findOne({ url: req.body.url });
      if (tocken.isValid) {
        // res.json({data:tocken})
      const admin = await AdminModel.findById(tocken.for.id);
      res.json({
        message: { message: "Admin Info", type: "success" },
        data: admin,
      });
        await tocken.update({isValid:false})
    } else {
      res.json({ message: { message: "Tocken Is Not Valid", type: "failed" } });
    }
  } else {
    res.json({
      message: { message: "Please Redirect To Admin/Login", type: "redirect" },
    });
  }

};

exports.createNewTocken = createNewTocken;
exports.getTockenByUrl = getTockenByUrl;
