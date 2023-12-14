const express = require("express");
const multer  = require('multer')
const router = express.Router();
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({ storage:storageMulter() })
const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/product.validate")
router.get("/",controller.product );
router.patch("/changeStatus/:status/:id",controller.changeStatus);
router.patch("/changeMulti",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
router.post("/create", upload.single('thumbnail'),validate.createPost ,controller.createPost);
router.get("/edit/:id",controller.edit);


module.exports = router;