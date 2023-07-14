const Products = require('../models/products');
const Category = require('../models/category');

exports.getplpById = async function (req, res) {
  const cid = req.params.cid;
  const proxyHost = req.headers["x-forwarded-host"];
  const host = proxyHost ? proxyHost : req.headers.host;
  try {
    const products = await Products.find({ primary_category_id: cid });
    const categoryId = products[0].primary_category_id.split("-");

    if (categoryId[0] == "root") {
      req.breadcrumbs([categoryId[0]])
    } else {
      req.breadcrumbs(categoryId[0], "http://" + host + "/category/" + [categoryId[0]]);
      req.breadcrumbs(categoryId.slice(0, 2).join("-"), "http://" + host + "/category/" + [categoryId.slice(0, 2).join("-")] + "?rootCat=" + categoryId[0]);
      req.breadcrumbs(categoryId.join("-"));
    }





    res.render('productsByCid', {
      title: "Products Page",
      products: products,
      breadcrumbs: req.breadcrumbs()
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getSingleProduct = async function (req, res) {
  const id = req.params.productId;
  const proxyHost = req.headers["x-forwarded-host"];
  const host = proxyHost ? proxyHost : req.headers.host;

  try {
    const product = await Products.findById(id);
    const categoryId = product.primary_category_id.split("-");
    if (categoryId[0] == "root") {
      req.breadcrumbs([categoryId[0]])
    } else {
      req.breadcrumbs(categoryId[0], "http://" + host + "/category/" + [categoryId[0]]);
      req.breadcrumbs(categoryId.slice(0, 2).join("-"), "http://" + host + "/category/" + [categoryId.slice(0, 2).join("-")] + "?rootCat=" + categoryId[0]);
      req.breadcrumbs(categoryId.join("-"), "http://" + host + "/products/" + categoryId.join("-"));
      req.breadcrumbs(id);
    }

    const soapClient = req.app.get('soapClient');
    const result = await soapClient.getallAsync({ dt: '2023-05-12' });

    let ronToEur = 0;
    let ronToTry = 0;

    const currencies = result[0].getallResult.diffgram.DocumentElement.Currency;
    for (let i = 0; i < currencies.length; i++) {
      if (currencies[i].IDMoneda === 'EUR') {
        ronToEur = 1 / currencies[i].Value;
      } else if (currencies[i].IDMoneda === 'TRY') {
        ronToTry = 1 / currencies[i].Value;
      }
    }

    const eurPrice = product.price * ronToEur;
    const tryPrice = product.price * ronToTry;
    console.log(tryPrice);


    res.render('productDetails', {
      title: product.name,
      product: product,
      eurPrice: eurPrice,
      tryPrice: tryPrice,
      breadcrumbs: req.breadcrumbs()
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
