const nodemailer = require("nodemailer");
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
      const date = new Date();
      const nowDate = date[Symbol.toPrimitive]("string");
      const newUser = new UserModel({
        displayName: req.body.displayName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        joinDate: nowDate,
        haveContactToken: true,
        photoURL: "",
        comments: [],
        cartItems: [],
        lastUpdate: undefined,
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
  next();
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
  next();
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
  next();
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
        const date = new Date();
        const updateDate = date[Symbol.toPrimitive]("string");
        await UserModel.findByIdAndUpdate(user._id, {
          photoURL: req.body.photoURL,
          displayName: req.body.displayName,
          userName: req.body.userName,
          email: req.body.email,
          password:
            req.body.password === "" ? user.password : req.body.password,
          lastUpdate: updateDate,
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
  next();
};

const userForgotPassword = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const userEmail = req.body.userEmail;
    const resetType = req.body.resetType;

    if (resetType === "email" || resetType === undefined || null) {
      var user = await UserModel.findOne({ email: userEmail });
    } else {
      var user = await UserModel.findOne({ userName: userEmail });
    }
    if (user === null || undefined) {
      res.json({
        message: {
          type: "failed",
          message:
            resetType === "email"
              ? "Sorry we couldn't find an Account Linked to This Email Address You can Create your account Using this Link Below"
              : "Sorry we couldn't find an Account With this Username You can Create your account Using this Link Below",
        },
      });
    } else {
      if (user)
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "no1.shop.v01@gmail.com",
            pass: "Hesam12345",
            clientId:
              "183844931028-2biu2jb15jfgocbhrh5vh888cb0jrc8v.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken:
              "1//0412cnA9DTJmoCgYIARAAGAQSNwF-L9IrCIsVAyJxzcOHBB-iWlY-E149veWzoay7AxaAxTz5B_k9RBb-1Lba4bPRBgJLWsf5RpM",
            accessToken:
              "ya29.a0Ad52N399IXkuLq2TWYxycxE3O-NcSBvDDmfp8_j99KRdsykyCFrgpKqfda13n4CnkkX4X9rvBaw-UKsRxb9apOhyJpwhfCC2AKbfQPcjsAMyDj1Wkrp_bBpu4rsOmvpPVX9PKqqH6KiPrSHn7IMYCWwBlNEX2elv9ZVfaCgYKAeQSARESFQHGX2MiyxAYdYodTJaAojgzH4uWSA0171",
          },
        });

      var mailOptions = {
        from: "No1-Shop-Support@no1Shop.com",
        to: user.email,
        subject: "Forget Password",
        html: `<h1 style='width:100%;text-align:center;'>Hello Dear No1-Shop User</h1></br> 
       <p style='width:100%;text-align:center;'>We send you Your password Please Be Careful to not Forget it Again</p></br>
       <h2 style='width:100%;text-align:center;'>${user.password}</h2> 
       <p style='width:100%;text-align:left;'>Your No1-Shop</p>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({
            message: {
              message: `Operation Failure There Is Something Wrong during sending Email`,
              type: "failed",
            },
          });
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json({
        message: {
          message: "Confirmed! Please Check your Inbox for Next Steps",
          type: "success",
        },
      });
      console.log("we send email end process Check");
    }
    next();
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
exports.userForgotPassword = userForgotPassword;
exports.addProductToUserCart = addProductToUserCart;
exports.userLogin = userLogin;
exports.updateUserProfile = updateUserProfile;
