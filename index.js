const express = require('express'); // importo express

/* variables de entorno .env */
require('dotenv').config();

/* crear servidor express */
const app = express();



/* importo la db */
const { dbConnection } = require('./database/config');




/* base de datos */
dbConnection();

/* rutas */




/* ------------------------------- */
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});