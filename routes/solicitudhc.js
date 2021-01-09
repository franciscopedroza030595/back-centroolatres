/* 
    ruta:'/api/solicitudhc'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearSocilitud, getSocilitud, borrarSocilitud, actualizarSocilitud } = require('../controllers/solicitudhc');

const router = Router();

/* middleware validarJWT */
router.get('/', getSocilitud);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,
        check('paciente', 'El paciente id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearSocilitud);



/* ruta para hacer el delete */
router.delete('/:id', borrarSocilitud);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarSocilitud);



module.exports = router;