const Product = require("../../models/product.model")
module.exports.product = async (req,res)=>{
    const products = await Product.find({
        status: "active",
        deleted:"false"
    })
    res.render('clients/pages/product.pug',{
        titlePage: "Trang sản phẩm",
        product:products,
    });
}