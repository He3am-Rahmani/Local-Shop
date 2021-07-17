const Comments = require("../models/CommentModels");

const getAllComments = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const data = await Comments.find({});

    await res.json(data);
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};
const deleteComment = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    await Comments.findByIdAndDelete(req.body.id);
    res.json({ message: { message: "Comment Deleted", type: "success" } });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

const updateComment = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    await Comments.findByIdAndUpdate(req.body.id, {
      isVerified: req.body.isVerified,
    });
    res.json({ message: { message: "Comment Updated", type: "success" } });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

const createComment = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const NewComment = new Comments({
      author: req.body.author,
      body: req.body.body,
      photoURL: req.body.photoURL,
      product: req.body.product,
      replys: req.body.replys,
      isVerified: false,
    });

    await NewComment.save();

    res.json({
      message: { message: "Your Comment Submitted After Confirmation Will Be Published", type: "success" },
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

const getSpeceficProductAllComments = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const comment = await Comments.find({ product: req.body.product });

    res.json({
      message: { type: "success", message: "Success" },
      data: comment,
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

exports.getAllComments = getAllComments;
exports.deleteComment = deleteComment;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.getSpeceficProductAllComments = getSpeceficProductAllComments;
