const mongoose = require('mongoose');

const GanadoSchema = mongoose.Schema({
	ganadoID: {
		type: String,
		unique: true,
		required: true,
	},
	fechaDeNacimiento: {
		type: String,
		required: true
	},
	fechaDeIngreso: {
		type: String,
		required: true
	},
	genero: {
		type: String,
		required: true
	},
	proposito: {
		type: String,
		required: true
	},
	salud: {
		type: String,
		required: true
	},
	descripcion: {
		type: String,
		required: false
	},
	litros: {
		type: String,
		required: false
	},
	destetado: {
		type: String,
		required: false
	},
	fechaDeVacunacion: {
		type: String,
		required: true,
	},
	ultimoParto: {
		type: String,
		required: false,
	},
	fechaCreacion: {
		type: Date,
		default: Date.now()
	},
	imagen: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('Ganado', GanadoSchema);