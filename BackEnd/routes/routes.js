const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product-controllers");
const adminControllers = require("../controllers/admin-controllers");
const supportControllers = require("../controllers/support-controllers");
const discountControllers = require("../controllers/discount-controllers");
const tockenControllers = require("../controllers/tocken-controllers");
const commentControllers = require("../controllers/comment-controllers");
const userControllers = require("../controllers/user-controllers");

/// Products

router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProduct);
router.post("/products/remove", productControllers.deleteProduct);
router.post("/products/create", productControllers.createProduct);
router.put("/products/update/", productControllers.updateProduct);
// router.post("/products", productControllers.getAllProducts);

/// Admins

router.post("/admin/login", adminControllers.getAdmin);
router.post("/admin/create", adminControllers.createAdmin);
router.get("/admin/:id", adminControllers.getAdminById);
router.post("/admin/get-admins", adminControllers.getAllAdmins);
router.post("/admin/remove", adminControllers.deleteAdmin);

/// Tockens

router.post("/tocken/new/", tockenControllers.createNewTocken);
router.post("/tocken/get-admin/", tockenControllers.getTockenByUrl);
router.put("/tocken/used/:url", tockenControllers.setTockenExpire);

/// Discounts

router.post("/discount/check/:code", discountControllers.checkDisCode);
router.post("/discount/create", discountControllers.createDisCode);
router.post("/discount/get-all", discountControllers.getAllDis);
router.post("/discount/remove", discountControllers.delDis);

/// Suppourt /// Contact

router.post("/ticket/new-ticket", supportControllers.createSupportTicket);
router.post("/ticket/get-all", supportControllers.getSupportTickets);
router.post("/ticket/del", supportControllers.deleteSupportTicket);

/// Commments

router.post("/comment/add-reply", commentControllers.addReplyToComment);
router.post("/comment/delete-reply", commentControllers.deleteReply);
router.put("/comment/update-reply", commentControllers.setReplyVerified);
router.post("/comments", commentControllers.getAllComments);
router.post(
  "/comment/get-specefic",
  commentControllers.getSpeceficProductAllComments
);
router.post("/comment/remove", commentControllers.deleteComment);
router.post("/comment/create", commentControllers.createComment);
router.put("/comment/update", commentControllers.updateComment);
router.post("/comment/user-comments", commentControllers.getUserComments);

/// Users

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.userLogin);
router.post("/add-product-to-cart", userControllers.addProductToUserCart);
router.post("/update-profile", userControllers.updateUserProfile);
router.post('/user/forgot-password',userControllers.userForgotPassword)
module.exports = router;
