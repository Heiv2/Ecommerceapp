const mongoose = require('mongoose');
require('dotenv').config();

const DbUrl = `mongodb+srv://ekozdemir12:${process.env.MONGO_PASSWORD}@cluster0.b9q5ocj.mongodb.net/shop`;

const connectDB = async () => {
	try {
		await mongoose.connect(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('Connected to MongoDB...');
	} catch (err) {
		console.error('Could not connect to MongoDB...', err);
	}
};

module.exports = connectDB;