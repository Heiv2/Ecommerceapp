const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: {
			validator: function (value) {
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
			},
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
	password: {
		type: String,
		required: true,
		validate: {
			validator: function(value) {
				return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value);
			},
			message: () => 'Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.',
		},
	},
}, { collection: 'User' });

userSchema.pre('save', async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password,salt);
	next();
});

userSchema.statics.login = async function(email, password){
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth){
			return user;
		}
		throw Error('Incorrect Password');
	}
	throw Error('Incorrect Email Entered');
};
  
const user = mongoose.model('User', userSchema);
module.exports = user;