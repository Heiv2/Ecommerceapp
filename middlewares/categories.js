const Category = require('../models/category');

const fetchCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories || categories.length === 0) {
            return next();
        }

        const categoryDetails = categories.map(category => {
            return { name: category.name, id: category.id };
        });

        res.locals.categories = categoryDetails;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
module.exports = fetchCategories;
