const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', require('./routes/router'));

app.use(morgan('dev'));

app.listen(4000, () => {
	console.log('Servidor escuchando');
});