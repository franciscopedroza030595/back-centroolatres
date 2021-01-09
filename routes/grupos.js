/* 
    ruta:'/api/grupo'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearGrupo, getGrupo, borrarGrupo, actualizarGrupo } = require('../controllers/grupos');

const router = Router();

/* middleware validarJWT */
router.get('/', getGrupo);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        /*  check('paciente', 'El paciente id debe ser valido').isMongoId(),

         validarCampos */

    ],
    crearGrupo);



/* ruta para hacer el delete */
router.delete('/:id', borrarGrupo);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarGrupo);



module.exports = router;