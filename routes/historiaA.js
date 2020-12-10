/* 
    ruta:'/api/historiaA'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearhistoriaA, getHistoriaA, borrarHistoriaA, actualizarHistoriaA } = require('../controllers/historiaA');

const router = Router();

/* middleware validarJWT */
router.get('/', getHistoriaA);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        check('paciente', 'El paciente id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearhistoriaA);



/* ruta para hacer el delete */
router.delete('/:id', borrarHistoriaA);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarHistoriaA);



module.exports = router;