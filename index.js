// DB_C=mongodb://127.0.0.1:27017/centroolatres
// DB_C=mongodb://backendServer:franciscoAbcOlatres2021-2@31.220.56.189:27017/centroolatres


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

/* prueba */
console.log(Date());
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
/* para historiaN */
app.use('/api/historiaN', require('./routes/historiaN'));
/* para terapiaP */
app.use('/api/terapiaP', require('./routes/terapiaP'));
/* para seguimiento */
app.use('/api/seguimiento', require('./routes/seguimientos'));
/* para remision */
app.use('/api/remision', require('./routes/remisiones'));
/* para psiquiatricas */
app.use('/api/psiquiatrica', require('./routes/psiquiatricas'));
/* para terapia ocupacional */
app.use('/api/terapiaocu', require('./routes/terapiasocu'));
/* para grupos */
app.use('/api/grupo', require('./routes/grupos'));
/* para solicitudes de hc */
app.use('/api/solicitudhc', require('./routes/solicitudhc'));




/* ruta para busqueda */
app.use('/api/todo', require('./routes/busquedas'));

/* ruta para uploads (subida de imagenes)  ESTO YA NO ES NECESARO, IMAGENES EN BASE 64*/
app.use('/api/upload', require('./routes/uploads'));


/* ------------------------------- */
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});