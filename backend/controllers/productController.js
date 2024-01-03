const Product = require("../models/Product");


exports.crearProducto = async (req, res) => {
	try{

		let producto;

		producto = new Product({
		productID: req.body.productID,
		product: req.body.product,
		descripcion: req.body.descripcion,
		stock: req.body.stock,
		tipo: req.body.tipo,
		alerta: req.body.alerta
		});
		
		await producto.save();
		res.send(producto);
	}
	catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};

exports.obtenerProductos = async (req, res) =>{
	try{
		const productos = await Product.find();
		res.json(productos);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};

exports.actualizarProducto = async (req, res) => {
	try{
		const { product, categoria, stock, alerta, descripcion, productID } = req.body;
		let producto = await Product.findById(req.params.id);

		if(!producto){
			res.status(404).json({msg: 'No existe el producto'});
		}
		producto.product = product;
		producto.categoria = categoria;
		producto.stock = stock;
		producto.alerta = alerta;
		producto.descripcion = descripcion;
		producto.productID = productID;



		producto = await Product.findOneAndUpdate({ _id: req.params.id}, producto, {new: true});
		res.json(producto);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};
exports.obtenerProducto = async (req, res) => {
	try{
		let producto = await Product.findById(req.params.id);

		if(!producto){
			res.status(404).json({msg: 'No existe el producto'});
		}
		res.json(producto);

	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};
exports.eliminarProducto = async (req, res) => {
	try{
		let producto = await Product.findById(req.params.id);

		if(!producto){
			res.status(404).json({msg: 'No existe el producto'});
		}
		await Product.findOneAndDelete({_id: req.params.id});
		res.json({msg: 'El objeto ha sido eliminado'});
		//asdasasd


	}catch(error){
		console.log(error);
		res.status(500).send('HUBO UN ERROR');
	}
};

