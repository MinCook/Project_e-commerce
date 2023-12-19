const { model } = require("mongoose");
const Product = require("../../models/product.model");
module.exports.product = async (req, res) => {
  let find = {
    deleted: "false",
  };
  req.query.status ? (find.status = req.query.status) : "";
  req.query.keysearch
    ? (find.title = new RegExp(req.query.keysearch, "i"))
    : "";
  let paginationObj = {
    limit: 4,
  };
  paginationObj.skip =
    (parseInt(req.query.page) - 1) * parseInt(paginationObj.limit);
  let totalPage = Math.ceil(
    (await Product.countDocuments(find)) / paginationObj.limit
  );
  let products = await Product.find(find)
    .limit(paginationObj.limit)
    .skip(paginationObj.skip)
    .sort({position:"desc"});
  let currentPage = parseFloat(req.query.page);
  res.render("admin/pages/product/index.pug", {
    titlePage: "Trang Admin sản phẩm",
    products: products,
    keysearch: req.query.keysearch,
    page: totalPage,
    currentPage: currentPage,
  });
};
// ----------------------------END PAGINATION----------------
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};
// ----------------------------END CHANGE STATUS----------------
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ") || "";
  if(ids != ""){
    switch (type) {
      case "active":
        await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
        break;
      case "inactive":
        await Product.updateMany({ _id: { $in: ids } }, { status: "async" });
        break;
      case "deleteAll":
        await Product.updateMany({ _id: { $in: ids } }, { deleted: true });
        break;
        case "changePosition":
          for ( const item of ids){
            let [id,position] = item.split("-");
            await Product.updateOne({ _id: { $in: id } }, { position: position });
          }
          break;
    }
  }
  res.redirect("back");
};
// ----------------------------END CHANGE MULTI----------------
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });
  res.redirect("back");
};
// ----------------------------END SOFT DELETE ITEM----------------
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create.pug");
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price)
  req.body.stock = parseInt(req.body.stock)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
// if(req.file){  req.body.thumbnail = `/uploads/${req.file.filename}`}
  if(req.body.position == " "){
    req.body.position = await Product.countDocuments() + 1
  }
  const product = new Product(req.body)
  await product.save();
  res.redirect(`/admin/product`)
};
// ----------------------------END  CREATE NEW  ITEM----------------

module.exports.edit = async (req, res) => {
  res.send("OK")
};