const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product-controllers");
const adminControllers = require("../controllers/admin-controllers");
const supportControllers = require("../controllers/support-controllers");
const discountControllers = require("../controllers/discount-controllers");
const tockenControllers = require("../controllers/tocken-controllers");

router.get("/products", productControllers.getAllProducts);
// router.post("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProduct);
router.post("/admin/login", adminControllers.getAdmin);
router.post("/admin/create", adminControllers.createAdmin);
router.get("/admin/:id", adminControllers.getAdminById);
router.post("/admin/get-admins", adminControllers.getAllAdmins);
router.post("/admin/remove", adminControllers.deleteAdmin);
router.post("/products/remove", productControllers.deleteProduct);
router.post("/products/create", productControllers.createProduct);
router.post("/ticket/new-ticket", supportControllers.createSupportTicket);
router.post("/ticket/get-all", supportControllers.getSupportTickets);
router.post("/ticket/del", supportControllers.deleteSupportTicket);
router.post("/discount/check/:code", discountControllers.checkDisCode);
router.post("/discount/create", discountControllers.createDisCode);
router.post("/discount/get-all", discountControllers.getAllDis);
router.post("/discount/remove", discountControllers.delDis);
router.post("/tocken/new/", tockenControllers.createNewTocken);
router.post("/tocken/get-admin/", tockenControllers.getTockenByUrl);
router.put("/tocken/used/:url", tockenControllers.setTockenExpire);

module.exports = router;
