"use strict";

const Category = require('../models/category');

exports.getCategoryById = async function (req, res) {
    const categoryId = req.params.categoryId;
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;

    try {
        const category = await Category.findOne({ id: req.query.rootCat || categoryId });

        const foundCategory = req.query.rootCat ? category.categories.find(element => categoryId == element.id) : category;
        if (!foundCategory) {
            return res.status(404).send('Category not found');
        }
        
        if (foundCategory.parent_category_id == "root") {
            req.breadcrumbs(categoryId);
        } else {
            req.breadcrumbs(foundCategory.parent_category_id, "http://" + host + "/category/" + foundCategory.parent_category_id)
            req.breadcrumbs(categoryId);
        }

        res.render('category', {
            title: foundCategory.page_title,
            category: foundCategory,
            breadcrumbs: req.breadcrumbs()
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};
