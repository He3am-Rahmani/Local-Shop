const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product-controllers");
const adminControllers = require("../controllers/admin-controllers");
const tokenControllers = require('../controllers/token-controllers')
const discountControllers =require('../controllers/discount-controllers')

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
router.post('/token/new-token/:key',tokenControllers.createToken)
router.get('/token/get-all/:key',tokenControllers.getTokens)
router.post('/token/del/:key', tokenControllers.deleteToken)
router.get('/discount/check/:code&:key',discountControllers.checkDisCode)
router.post('/discount/create/:key',discountControllers.createDisCode)
router.get('/discount/get-all/:key',discountControllers.getAllDis)
router.post('/discount/remove/:key', discountControllers.delDis)

module.exports = router;
