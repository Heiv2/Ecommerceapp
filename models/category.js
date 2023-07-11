const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  c_showInMenu: {
    type: Boolean
  },
  id: {
    type: String
  },
  name: {
    type: String
  },
  page_description: {
    type: String
  },
  page_title: {
    type: String
  },
  parent_category_id: {
    type: String
  },
  categories: [Schema.Types.Mixed]
}, { collection: 'Category' });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
