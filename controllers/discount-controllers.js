const DiscountModel = require("../models/DiscountModel");

const checkDisCode = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const Exist = await DiscountModel.findOne({ name: req.params.code });

    if (Exist) {
      res.json({
        message: { message: "discount Code Is Valid", type: "success" },
        data: Exist,
      });
    } else {
      res.json({
        message: { message: "Code Is Not Valid", type: "failed" },
      });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};
const getAllDis = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const dises = await DiscountModel.find({});
    res.json({
      message: { message: "Everything alright", type: "success" },
      data: dises,
    });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

const createDisCode = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    if (await DiscountModel.findOne({ name: req.body.name })) {
      res.json({
        message: {
          message:
            "Operation Failure We Have an Active Discount Code With This Name",
          type: "failed",
        },
      });
    } else {
      const NewDiscountCode = new DiscountModel({
        key: req.body.key,
        name: req.body.name,
        value: req.body.value,
      });

      await NewDiscountCode.save();
      const dises = await DiscountModel.find({});
      res.json({
        message: {
          message: "Discount Code Created You Can Publish It Now",
          type: "success",
        },
        data: dises,
      });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

const delDis = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const id = req.body.id;

    try {
      await DiscountModel.findByIdAndDelete(id);
      const disesList = await DiscountModel.find({});
      res.json({
        message: { message: "Discount Code Dleted", type: "success" },
        data: disesList,
      });
    } catch (error) {
      res.json({
        message: { message: "Delete Operation failed", type: "failed" },
      });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

exports.createDisCode = createDisCode;
exports.checkDisCode = checkDisCode;
exports.getAllDis = getAllDis;
exports.delDis = delDis;
