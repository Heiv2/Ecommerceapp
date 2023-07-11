const Category = require('../models/category');

exports.getCategoryById = async function (req, res) {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findOne({ id: categoryId });
    res.render('category', {
      title: category.page_title,
      category: category
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
exports.getCategoryByName = async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName;
    console.log(req.query.rootCat);
    console.log('Searching for category:', categoryName);

    const category = await Category.findOne({ id: req.query.rootCat });
    const foundCategory = category.categories.find(element => categoryName == element.id

    );
    if (!foundCategory) {
      return res.status(404).send('Category not found');
    }

    console.log('Found category:', foundCategory.id);

    if (category.categories && category.categories.length > 0) {
      return res.render('category', { title: foundCategory.page_title, category: foundCategory });
    } else {
      return res.render('category', { category: category });
    }

  } catch (err) {
    return next(err);
  }
};
