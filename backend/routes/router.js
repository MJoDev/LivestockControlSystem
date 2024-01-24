//Router
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const ganadoController = require('../controllers/ganadoController');
const bodyParser = require('body-parser');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname);
	}
  });


const upload = multer({ storage: storage });

//productos
router.post('/producto', productController.crearProducto);
router.get('/producto', productController.obtenerProductos);
router.put('/producto/:id', productController.actualizarProducto);
router.get('/producto/:id', productController.obtenerProducto);
router.delete('/producto/:id', productController.eliminarProducto);

//ganado
router.post('/ganado', ganadoController.crearGanado);
router.get('/ganado', ganadoController.obtenerGanados);
router.put('/ganado/:id', ganadoController.actualizarGanado);
router.get('/ganado/:id', ganadoController.obtenerGanado);
router.delete('/ganado/:id', ganadoController.eliminarGanado);

router.post('/upload', upload.single('file'), (req, res) => {
	// Manejar la subida de archivos aquí
	const imageUrl = `http://localhost:4000/api/uploads/${req.file.filename}`;
	res.json({ imageUrl });
  });
  

//usuarios
router.post('/register', async (req, res) => {
	
	const { user, password } = req.body;
	const existingUser = await User.findOne({ user });
	if (existingUser) {
		return res.status(400).json({ error: 'El Usuario ya existe. Debe ser único.' });
	}

	const newUser = new User({ user, password });
	await newUser.save();
	const token = jwt.sign({_id: newUser._id}, 'secretkey');
	res.status(200).json({token});
});

router.post('/sigin', async (req, res) => {
	const { user, password } = req.body;
	const thisuser = await User.findOne({user});
	
	if(!thisuser) return res.status(404).send('not found');
	
	if(thisuser.password !== password) return res.status(401).send('Wrong password');

	const token = jwt.sign({_id: user._id}, 'secretkey');
	return res.status(200).json({token});

});

router.get('/home', verifyToken, async (req, res) => {
    let _id = req.userId;
    let usuario = await User.findOne({_id})
    res.json({usuario})
});

router.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });

module.exports = router;

function verifyToken(req, res, next){
	if(!req.headers.authorization){
		return res.status(401).send('failed');
	}
	const token = req.headers.authorization.split(' ')[1];
	if (token == null){
		return res.status(401).send('failed');
	}
	console.log(token);

	const payload = jwt.verify(token, 'secretkey');
	console.log(payload);
	req.userId = payload._id;
	next();
}