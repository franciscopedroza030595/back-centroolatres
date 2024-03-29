/* 
    ruta:'/api/seguimiento'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearSeguimiento, getSeguimiento, borrarSeguimiento, actualizarSeguimiento } = require('../controllers/seguimientos');

const router = Router();

/* middleware validarJWT */
router.get('/', getSeguimiento);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,



    ],
    crearSeguimiento);



/* ruta para hacer el delete */
router.delete('/:id', borrarSeguimiento);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarSeguimiento);



module.exports = router;