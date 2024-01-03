//Router
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const ganadoController = require('../controllers/ganadoController');


router.post('/producto', productController.crearProducto);
router.get('/producto', productController.obtenerProductos);
router.put('/producto/:id', productController.actualizarProducto);
router.get('/producto/:id', productController.obtenerProducto);
router.delete('/producto/:id', productController.eliminarProducto);

router.post('/ganado', ganadoController.crearGanado);
router.get('/ganado', ganadoController.obtenerGanados);
router.put('/ganado/:id', ganadoController.actualizarGanado);
router.get('/ganado/:id', ganadoController.obtenerGanado);
router.delete('/ganado/:id', ganadoController.eliminarGanado);





module.exports = router;