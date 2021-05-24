const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product-controllers");
const adminControllers = require("../controllers/admin-controllers");
const supportControllers = require('../controllers/support-controllers')
const discountControllers =require('../controllers/discount-controllers');
const tockenControllers = require("../controllers/tocken-controllers");


router.get("/products", productControllers.getAllProducts);
// router.post("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProduct);
router.post("/admin/login", adminControllers.getAdmin);
router.post("/admin/create/:key", adminControllers.createAdmin);
router.get("/admin/:id", adminControllers.getAdminById);
router.get("/admin/get-admins/:key", adminControllers.getAllAdmins);
router.post("/admin/remove/:key", adminControllers.deleteAdmin);
router.post("/products/remove/:key", productControllers.deleteProduct);
router.post('/products/create/:key' , productControllers.createProduct)
router.post('/ticket/new-ticket/:key',supportControllers.createSupportTicket)
router.get('/ticket/get-all/:key',supportControllers.getSupportTickets)
router.post('/ticket/del/:key', supportControllers.deleteSupportTicket)
router.get('/discount/check/:code&:key',discountControllers.checkDisCode)
router.post('/discount/create/:key',discountControllers.createDisCode)
router.get('/discount/get-all/:key',discountControllers.getAllDis)
router.post('/discount/remove/:key', discountControllers.delDis)
router.post('/tocken/new/', tockenControllers.createNewTocken )
router.post('/tocken/get-admin/',tockenControllers.getTockenByUrl)

module.exports = router;
