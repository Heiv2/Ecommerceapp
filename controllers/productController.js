const Products = require('../models/products');

exports.getproductById = async function (req, res) {
  const cid = req.params.cid;
  try {
    const products = await Products.find({ primary_category_id: cid });
    res.render('productsByCid', {
      title: "Products Page",
      products: products
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.getSingleProduct = async function (req, res) {
  const id = req.params.productId;
  try {
    const product = await Products.findById(id);
    res.render('productDetails', {
      title: product.name,
      product: product
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
