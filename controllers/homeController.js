'use strict';

const fetchCategories = require('../middlewares/categories');

const home = async (req, res) => {
	try {
		// Add this line
		await fetchCategories(req, res, () => { });
		const categories = res.locals.categories;

		if (!categories || categories.length === 0) {
			return res.status(404).send('No categories found');
		}

		res.render('index', {
			title: 'Category Details',
			category: categories,
			breadcrumbs: req.breadcrumbs()
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error');
	}
};

module.exports = {
	home: home
};
