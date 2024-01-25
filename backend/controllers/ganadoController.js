const Ganado = require("../models/Ganado");


exports.crearGanado = async (req, res) => {
	try{
		let ganado;

		ganado = new Ganado({
		ganadoID: req.body.ganadoID,
		salud: req.body.salud,
		litros: req.body.litros,
		fechaDeNacimiento: req.body.fechaDeNacimiento,
		fechaDeIngreso: req.body.fechaDeIngreso,
		fechaDeVacunacion: req.body.fechaDeVacunacion,
		ultimoParto: req.body.ultimoParto,
		genero: req.body.genero,
		descripcion: req.body.descripcion,
		destetado: req.body.destetado,
		proposito: req.body.proposito,
		imagen: req.body.imagen,

		});
		
		await ganado.save();
		res.send(ganado);
	}
	catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};

exports.obtenerGanados = async (req, res) =>{
	try{
		const ganados = await Ganado.find();
		res.json(ganados);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};

exports.actualizarGanado = async (req, res) => {
	try{
		const { ultimoParto, ganadoID, salud, litros, fechaDeNacimiento, fechaDeIngreso, fechaDeVacunacion, genero, descripcion, destetado, proposito, imagen} = req.body;
		let ganado = await Ganado.findById(req.params.id);

		if(!ganado){
			res.status(404).json({msg: 'No existe'});
		}
		ganado.ganadoID = ganadoID;
		ganado.salud = salud;
		ganado.litros = litros;
		ganado.fechaDeNacimiento = fechaDeNacimiento;
		ganado.fechaDeIngreso = fechaDeIngreso;
		ganado.fechaDeVacunacion = fechaDeVacunacion;
		ganado.ultimoParto = ultimoParto;
		ganado.descripcion = descripcion;
		ganado.genero = genero;
		ganado.destetado = destetado;
		ganado.proposito = proposito;
		ganado.imagen = imagen;



		ganado = await Ganado.findOneAndUpdate({ _id: req.params.id}, ganado, {new: true});
		res.json(ganado);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};
exports.obtenerGanado = async (req, res) => {
	try{
		let ganado = await Ganado.findById(req.params.id);

		if(!ganado){
			res.status(404).json({msg: 'No existe'});
		}
		res.json(ganado);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};
exports.eliminarGanado = async (req, res) => {
	try{
		let ganado = await Ganado.findById(req.params.id);

		if(!ganado){
			res.status(404).json({msg: 'No existe'});
		}
		await Ganado.findOneAndDelete({_id: req.params.id});
		res.json({msg: 'El objeto ha sido eliminado'});
		//asdasasd


	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};
