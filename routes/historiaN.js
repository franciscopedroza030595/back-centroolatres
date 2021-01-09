/* 
    ruta:'/api/historiaN'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearHistoriaN, getHistoriaN, borrarHistoriaN, actualizarHistoriaN } = require('../controllers/historiaN');

const router = Router();

/* middleware validarJWT */
router.get('/', getHistoriaN);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        check('paciente', 'El paciente id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearHistoriaN);



/* ruta para hacer el delete */
router.delete('/:id', borrarHistoriaN);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarHistoriaN);



module.exports = router;