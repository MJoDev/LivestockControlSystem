const { Schema, model } = require('mongoose');

const userSchema = Schema({
	user: String,
	password: String,
}, {
	timestamp: true
});

module.exports = model('User', userSchema);