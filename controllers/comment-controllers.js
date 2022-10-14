const Comments = require("../models/CommentModels");
const UserModel = require("../models/UserModels");
const mongoose = require("mongoose");

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
    const comment = await Comments.findById(req.body.id);

    const replyers = comment?.replys.map((item) => item.auhorId);

    res.json({
      message: {
        comment,
        replyers,
        replyersLength: replyers.length,
      },
    });

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
    const user = await UserModel.findById(req.body.authorId);

    const userComments = user.comments;

    const ids = userComments.map(({ _id }) => _id);

    const indexOfSelectedComment = ids.indexOf(req.body.id);

    const updatedComment = {
      ...userComments[indexOfSelectedComment],
      isVerified: req.body.isVerified,
    };

    userComments.splice(indexOfSelectedComment, 1, updatedComment);

    await UserModel.findByIdAndUpdate(req.body.authorId, {
      comments: userComments,
    });

    res.json({
      message: { message: "Comment Updated", type: "success" },
      data: {
        index: indexOfSelectedComment,
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

const createComment = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const newComment = new Comments({
      authorId: req.body.authorId,
      author: req.body.author,
      authorEmail: req.body.authorEmail,
      body: req.body.body,
      photoURL: req.body.photoURL,
      product: req.body.product,
      replys: req.body.replys,
      isVerified: false,
      isComment: true,
    });

    const user = await UserModel.findById(req.body.authorId);
    const comments = [...user.comments, newComment];

    await UserModel.findOneAndUpdate(req.body.authorId, {
      comments: [...user.comments, newComment],
    });
    await UserModel.findById(req.body.authorId);

    await newComment.save();

    res.json({
      message: {
        message: "Your Comment Submitted, After Confirmation Will Be Published",
        type: "success",
      },
      data: { user, comments },
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
const getUserComments = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const comments = await Comments.find({ authorId: req.body.authorId });

    // const replys = await Comments.find({
    //   replys: { $elemMatch: { authorId: req.body.authorId,  } },
    // });

    const replys = await Comments.find({
      authorId: `${req.body.authorId}`,
      isComment: false,
    });

    res.json({
      message: { type: "success", message: "Success" },
      data: replys,
      // data: comments,
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
    const {
      commentId,
      commentAuthorId,
      authorId,
      author,
      body,
      email,
      photoURL,
    } = req.body;
    const comment = await Comments.findById(commentId);
    const authorUser = await UserModel.findById(commentAuthorId);
    const replyerUser = await UserModel.findById(authorId);
    const reply = {
      _id: mongoose.Types.ObjectId(),
      commentId: commentId,
      commentAuthorId: commentAuthorId,
      authorId: authorId,
      author: author,
      body: body,
      email: email,
      photoURL: photoURL,
      isVerified: false,
      isComment: false,
    };

    const authorComments = authorUser.comments;

    const indexOfComment = authorComments.findIndex(
      (item) => item._id == commentId
    );

    const selectedComment = authorComments[indexOfComment];

    const updatedComment = {
      ...selectedComment,
      replys: [...selectedComment.replys, reply],
    };

    authorComments.splice(indexOfComment, 1, updatedComment);

    const replyerComments = replyerUser.comments;

    const updatedReplyerComment = [...replyerComments, reply];

    await UserModel.findByIdAndUpdate(commentAuthorId, {
      comments: authorComments,
    });
    if (authorId !== commentAuthorId) {
      await UserModel.findByIdAndUpdate(authorId, {
        comments: updatedReplyerComment,
      });
    }
    await Comments.findByIdAndUpdate(commentId, {
      replys: [...comment.replys, reply],
    });

    res.json({
      message: {
        type: "success",
        message: "Your Reply Submitted, After Confirmatin Will Be Published",
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

const setReplyVerified = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const { commentId, replyId, authorId, commentAuthorId, isVerified } =
      req.body;
    const comment = await Comments.findById(commentId);

    const updatingReplyIndex = comment.replys.findIndex(
      (item) => item._id == replyId
    );
    const reply = comment.replys[updatingReplyIndex];

    reply.isVerified = isVerified;

    comment.replys[updatingReplyIndex] = reply;

    const commentAuthorUser = await UserModel.findById(commentAuthorId);

    const commentsOfCommentAuthor = commentAuthorUser.comments;

    const indexOfComment = commentsOfCommentAuthor.findIndex(
      (item) => item._id == commentId
    );

    const commentReplys = commentsOfCommentAuthor[indexOfComment].replys;

    const indexOfReply = commentReplys.findIndex((item) => item._id == replyId);

    const updatedReply = {
      ...commentReplys[indexOfReply],
      isVerified: isVerified,
    };

    const updatedReplys = commentReplys.splice(indexOfReply, 1, updatedReply);

    const updatedComment = {
      ...commentsOfCommentAuthor[indexOfComment],
      replys: updatedReplys,
    };

    const updatedComments = commentsOfCommentAuthor.splice(
      indexOfComment,
      1,
      updatedComment
    );

    const replyerUser = await UserModel.findById(authorId);

    const replyerComments = replyerUser.comments;

    const indexOfCurrentReply = replyerComments.findIndex(
      (item) => item._id == replyId
    );

    const currentReply = replyerComments[indexOfCurrentReply];

    const replyerUpdatedReply = {
      ...currentReply,
      isVerified: isVerified,
    };

    replyerUser.comments.splice(indexOfCurrentReply, 1, replyerUpdatedReply);

    const updatedreplyerComments = replyerComments;

    await UserModel.findByIdAndUpdate(authorId, {
      comments: updatedreplyerComments,
    });

    await UserModel.findByIdAndUpdate(commentAuthorId, {
      comments: updatedComments,
    });

    await Comments.findByIdAndUpdate(commentId, {
      replys: comment.replys,
    });

    res.json({
      message: {
        type: "success",
        message: "Operation Completed",
      },
    });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, Operation failur",
        type: "failed",
      },
    });
  }
};

const deleteReply = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const { commentId, replyId, commentAuthorId, authorId } = req.body;

    const currentComment = await Comments.findById(commentId);

    const replys = currentComment.replys;

    const replyIndex = replys.findIndex((item) => item._id == replyId);

    const user = await UserModel.findById(commentAuthorId);

    const userComments = user.comments;

    const indexOfSelectedComment = userComments.findIndex(
      (item) => item._id == commentId
    );

    const selectedComment = userComments[indexOfSelectedComment];

    const authorCommentReplys = selectedComment.replys;

    const updatedReplyArray = authorCommentReplys.filter(
      (item) => item._id != replyId
    );

    const newComment = { ...selectedComment, replys: updatedReplyArray };
    userComments.splice(indexOfSelectedComment, 1, newComment);

    const replyerUser = await UserModel.findById(authorId);

    const replyerComments = replyerUser.comments;

    const updatedCommentsArray = replyerComments.filter(
      (item) => item._id != replyId
    );

    if (replyIndex === -1) {
      res.json({ message: { type: "failed", meessage: "Reply Not Found" } });
    } else {
      replys.splice(replyIndex, 1);
      await UserModel.findByIdAndUpdate(authorId, {
        comments: updatedCommentsArray,
      });
      await Comments.findByIdAndUpdate(commentId, { replys: replys });
      await UserModel.findByIdAndUpdate(commentAuthorId, {
        comments: userComments,
      });

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
exports.getUserComments = getUserComments;
