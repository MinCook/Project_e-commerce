const express = require("express");
const multer  = require('multer')
const router = express.Router();
const upload = multer()
const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/product.validate")
const uploadCloud = require("../../middlewares/admin/upLoad.middlewares")

router.get("/",controller.product );
router.patch("/changeStatus/:status/:id",controller.changeStatus);
router.patch("/changeMulti",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
router.get("/create",controller.create);
router.post("/create", 
upload.single('thumbnail'),
uploadCloud.upload,
validate.createPost ,
controller.createPost);

router.get("/edit/:id",controller.edit);
module.exports = router;