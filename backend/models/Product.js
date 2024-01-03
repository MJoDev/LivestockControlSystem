const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	productID: {
		type: String,
		unique: true,
		required: true,
	},
	product: {
		type: String,
		required: true
	},
	descripcion: {
		type: String,
		required: false
	},
	tipo: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	},
	alerta: {
		type: Number,
		required: false
	},
	fechaCreacion: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Product', ProductSchema);