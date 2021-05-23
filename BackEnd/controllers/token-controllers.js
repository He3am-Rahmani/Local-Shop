const TokenModels = require("../models/TokenModels");

const getTokens = async (req, res, next) => {
  if (req.params.key === process.env.API_KEY) {
    const tokens = await TokenModels.find({});

    res.json({
      message: { message: "Everything is Alright", type: "success" },
      data: tokens,
    });
  } else {
    res.json({ message: { message: "failed", type: "failed" } });
  }
};
const createToken = async (req, res, next) => {
  if (req.params.key === process.env.API_KEY) {
    if (await TokenModels.findOne({ email: req.body.email })) {
      res.json({
        message: {
          message:
            "Each Email Can Submit Only 1 Request",
          type: "failed",
        },
      });
    } else {
      const newToken = new TokenModels({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
      });

     await newToken.save();
      res.json({ message: { message: "Token Created", type: "success" } });
    }
  } else {
    res.json({
      message: {
        message: `Ther Is Something Wrong Operation Failure`,
        type: "failed",
      },
    });
  }
};
const deleteToken = async (req, res, next) => {
  if (req.params.key === process.env.API_KEY) {
    await TokenModels.findByIdAndDelete(req.body.id);
    const allTokens = await TokenModels.find({});
    res.json({
      message: {
        message: `Removed From Token List`,
        type: "success",
      },
      data: { data: allTokens },
    });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

exports.getTokens = getTokens;
exports.createToken = createToken;
exports.deleteToken = deleteToken;
