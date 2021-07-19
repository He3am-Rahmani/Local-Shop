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
      authorEmail: req.body.authorEmail,
      body: req.body.body,
      photoURL: req.body.photoURL,
      product: req.body.product,
      replys: req.body.replys,
      isVerified: false,
    });

    await NewComment.save();

    res.json({
      message: {
        message: "Your Comment Submitted, After Confirmation Will Be Published",
        type: "success",
      },
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

const addReplyToComment = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const comment = await Comments.findById(req.body.commentId);

    const reply = {
      _id: `${Math.floor(Math.random() * 1000000000)}`,
      commentId: req.body.commentId,
      author: req.body.author,
      body: req.body.body,
      email: req.body.email,
      photoURL: req.body.photoURL,
      isVerified: false,
    };

    await Comments.findByIdAndUpdate(req.body.commentId, {
      replys: [...comment.replys, reply],
    });

    res.json(comment.replys);
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

const setReplyVerified = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const comment = await Comments.findById(req.body.commentId);

    const updatingReplyIndex = await comment.replys.findIndex(
      (item) => item._id === req.body.replyId
    );

    const reply = await comment.replys[updatingReplyIndex];

    reply.isVerified = req.body.isVerified;

    comment.replys[updatingReplyIndex] = reply;

    await Comments.findByIdAndUpdate(req.body.commentId, {
      replys: comment.replys,
    });

    res.json({ replys: comment.replys, reply: reply });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
};

const deleteReply = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const currentComment = await Comments.findById(req.body.commentId);

    const replys = currentComment.replys;

    const replyIndex = replys.findIndex(
      (item) => item._id === req.body.replyId
    );

    if (replyIndex === -1) {
      res.json({ message: { type: "failed", meessage: "Reply Not Found" } });
    } else {
      replys.splice(replyIndex, 1);

      await Comments.findByIdAndUpdate(req.body.commentId, { replys: replys });

      const updatedComment = await Comments.findById(req.body.commentId);

      res.json({
        message: { type: "success", message: "Reply Deleted Successfully" },
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
};

exports.deleteReply = deleteReply;
exports.setReplyVerified = setReplyVerified;
exports.addReplyToComment = addReplyToComment;
exports.getAllComments = getAllComments;
exports.deleteComment = deleteComment;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.getSpeceficProductAllComments = getSpeceficProductAllComments;
