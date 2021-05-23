const express = require("express");

const router = express.Router();

const productControllers = require("../controllers/product-controllers");
const adminControllers = require('../controllers/admin-controllers')


router.get("/products", productControllers.getAllProducts);
router.post("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getProduct);
router.post('/admin/login',adminControllers.getAdmin)
router.post('/admin/create/:key' , adminControllers.createAdmin)
router.get('/admin/:id' , adminControllers.getAdminById)

module.exports = router;
