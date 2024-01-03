const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api', require('./routes/router'));

app.listen(4000, () => {
	console.log('Servidor escuchando');
});