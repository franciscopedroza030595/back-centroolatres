const express = require('express'); // importo express

const bodyParser = require('body-parser'); // importo para bodyparser

/* variables de entorno .env */
require('dotenv').config();

/* habilitar conexion a dominios y demas permisos CORS */
const cors = require('cors');

/* importo la db */
const { dbConnection } = require('./database/config');

/* crear servidor express */
const app = express();

/* middleware para configurar lectura y parseo del body */
/* app.use(express.json()); */

/* para poder leer base64 fotos y firma */
app.use(bodyParser.json({ limit: "50mb" }));

/* configurar cors */
app.use(cors());

/* base de datos */
dbConnection();

/* rutas */
/* get, post usuario */
app.use('/api/usuarios', require('./routes/usuarios'));
/* para el login */
app.use('/api/login', require('./routes/auth'));
/* para pacientes */
app.use('/api/pacientes', require('./routes/pacientes'));
/* para parejas */
app.use('/api/parejas', require('./routes/parejas'));
/* para historiaA */
app.use('/api/historiaA', require('./routes/historiaA'));
/* para terapiaP */
app.use('/api/terapiaP', require('./routes/terapiaP'));
/* para seguimiento */
app.use('/api/seguimiento', require('./routes/seguimientos'));



/* ruta para busqueda */
app.use('/api/todo', require('./routes/busquedas'));

/* ruta para uploads (subida de imagenes)*/
app.use('/api/upload', require('./routes/uploads'));


/* ------------------------------- */
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});