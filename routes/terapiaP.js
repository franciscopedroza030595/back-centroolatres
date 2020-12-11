/* 
    ruta:'/api/terapiaP'
*/

const { Router } = require('express');
/* voy a importar express validators */
const { check } = require('express-validator');
/* importo validar campos middleware personalizado */
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getParejaP, crearparejaP, borrarTerapiaP, actualizarTerapiaP } = require('../controllers/terapiaP');

const router = Router();

/* middleware validarJWT */
router.get('/', getParejaP);

/* voy a enviar un middleware en este caso validators previo al crear  */
router.post('/', [

        validarJWT,

        check('pareja', 'la pareja id debe ser valido').isMongoId(),

        validarCampos

    ],
    crearparejaP);



/* ruta para hacer el delete */
router.delete('/:id', borrarTerapiaP);

// si no viene el token no puedo actualizar, para que los medicos hagan ediciones
router.put('/:id', validarJWT, actualizarTerapiaP);



module.exports = router;