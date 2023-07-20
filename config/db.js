const mongoose = require('mongoose');
require('dotenv').config();

const DbUrl = `${process.env.MONGO_URL}`;

const connectDB = async () => {
	try {
		await mongoose.connect(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to MongoDB...');
	} catch (err) {
		console.error('Could not connect to MongoDB...', err);
	}
};

module.exports = connectDB;