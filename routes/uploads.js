/* 
 ruta: api/uploads/
*/

const { Router } = require('express');

/* importo libreria express-fileupload */
const expressFileUpload = require('express-fileupload');
/* importo el uso de JWT */
const { validarJWT } = require('../middlewares/validar-jwt');
/* controller */
const { fileUpload, retornaImagen, } = require('../controllers/uploads');



const router = Router();

/* el middleware por defecto de expressFileUpload*/
router.use(expressFileUpload());


router.put('/:tipo/:id', validarJWT, fileUpload);



router.get('/:tipo/:foto', retornaImagen);








module.exports = router;