const UserModel = require("../models/UserModels");

const createUser = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    if (await UserModel.findOne({ email: req.body.email })) {
      res.json({
        message: {
          message:
            "Operation Failure This Email Is Already Linked To Another Account",
          type: "failed",
        },
      });
    } else if (await UserModel.findOne({ userName: req.body.userName })) {
      res.json({
        message: {
          message: "Operation Failure This UserName Already Taken",
          type: "failed",
        },
      });
    } else {
      const newUser = new UserModel({
        displayName: req.body.displayName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        joinDate: new Date().toLocaleString(),
        haveContactToken: true,
        photoURL: "",
        comments: [],
        cartItems: [],
      });

      await newUser.save();
      res.json({
        message: { message: "Welcome To No1 Shop", type: "success" },
      });
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

const userLogin = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const email = req.body.email;
    const password = req.body.password;

    let user;

    user = await UserModel.findOne({
      email: email,
      password: password,
    });

    if (user) {
      res.json({
        message: { message: `Welcome ${user.displayName}`, type: "success" },
        data: {
          _id: user._id,
          displayName: user.displayName,
          email: user.email,
          userName: user.userName,
          joinDate: user.joinDate,
          photoURL: user.photoURL,
          comments: user.comments,
          cartItems: user.cartItems,
          haveContactToken: user.haveContactToken,
        },
      });
    } else {
      res.json({
        message: {
          message: "Operation Failure Email Or Password Incorrect",
          type: "failed",
        },
      });
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

const addProductToUserCart = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const user = await UserModel.findById(req.body.userId);

    const testResponse = user.cartItems.filter(
      (item) => item._id === req.body.product._id
    );

    if (
      user.cartItems.filter((item) => item._id === req.body.product._id)
        .length > 0
    ) {
      res.json({
        message: {
          message: `This Item Is Already In Your Cart To Change Amount Of Products You Can Visit Cart Page`,
          type: "failed",
        },
      });
    } else {
      await UserModel.findByIdAndUpdate(req.body.userId, {
        cartItems: [...user.cartItems, req.body.product],
      });

      res.json({
        data: [...user.cartItems, req.body.product],
        message: {
          message: "Product Added To Cart",
          type: "success",
        },
        testResponse: testResponse,
      });
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

const updateUserProfile = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const user = await UserModel.findById(req.body.userId);

    if (req.body.actionType === "UPDATE_PROFILE") {
      const usersWithSameEmails = await UserModel.find({
        email: req.body.email,
      });
      const usersWithSameUserNames = await UserModel.find({
        userName: req.body.userName,
      });

      isEmailTaken =
        usersWithSameEmails.filter((item) => item.id !== req.body.userId)
          .length > 0;
      isUserNameTaken =
        usersWithSameUserNames.filter((item) => item.id !== req.body.userId)
          .length > 0;

      if (isEmailTaken) {
        res.json({
          message: {
            message:
              "Operation Failure This Email Is Already Linked To Another Account",
            type: "failed",
          },
        });
      } else if (isUserNameTaken) {
        res.json({
          message: {
            message: "Operation Failure This UserName Already Taken",
            type: "failed",
          },
        });
      } else {
        await UserModel.findByIdAndUpdate(user._id, {
          photoURL: req.body.photoURL,
          displayName: req.body.displayName,
          userName: req.body.userName,
          email: req.body.email,
          password:
            req.body.password === "" ? user.password : req.body.password,
        });

        const updatedUser = await UserModel.findById(user._id);

        res.json({
          data: updatedUser,
          message: {
            type: "success",
            message: "Profile Updated Successfully",
          },
        });
      }
    } else if (req.body.actionType === "UPDATE_CONTACT_TOKEN") {
      /// BLA BLA BLA
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

exports.createUser = createUser;
exports.addProductToUserCart = addProductToUserCart;
exports.userLogin = userLogin;
exports.updateUserProfile = updateUserProfile;
