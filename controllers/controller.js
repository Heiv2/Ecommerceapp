const fetchCategories = require('../middlewares/categories');
const Category = require('../models/category');
const test = async (req, res) => {
    try {
        // Add this line
        await fetchCategories(req, res, () => { });
        const categories = res.locals.categories;

        if (!categories || categories.length === 0) {
            return res.status(404).send("No categories found");
        }

        res.render("index", {
            title: 'Category Details',
            category: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

module.exports = {
    test: test
};
