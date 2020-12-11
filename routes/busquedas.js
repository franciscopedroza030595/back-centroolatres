/* 
 ruta: api/todo/:busqueda
*/

const { Router } = require('express');

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/* ------------------------------- */

router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', getDocumentosColeccion);



module.exports = router;