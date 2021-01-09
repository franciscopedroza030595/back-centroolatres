/* 
    ruta:'/api/remision'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearRemision, getRemision, borrarRemision, actualizarRemision } = require('../controllers/remisiones');

const router = Router();

/* middleware validarJWT */
router.get('/', getRemision);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,



    ],
    crearRemision);



/* ruta para hacer el delete */
router.delete('/:id', borrarRemision);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarRemision);



module.exports = router;