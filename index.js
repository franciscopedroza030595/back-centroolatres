const express = require('express'); // importo express

/* variables de entorno .env */
require('dotenv').config();

/* habilitar conexion a dominios y demas permisos CORS */
const cors = require('cors');

/* importo la db */
const { dbConnection } = require('./database/config');

/* crear servidor express */
const app = express();

/* middleware para configurar lectura y parseo del body */
app.use(express.json());

/* configurar cors */
app.use(cors());

/* base de datos */
dbConnection();

/* rutas */

app.use('/api/usuarios', require('./routes/usuarios'));




/* ------------------------------- */
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});