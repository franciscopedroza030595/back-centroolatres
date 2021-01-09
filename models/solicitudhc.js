const { Schema, model } = require('mongoose');


const SolicitudHSchema = Schema({

    paciente: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser de un paciente
        ref: 'Paciente',
        required: true
    },
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la historia tiene que ser hecha por un usuario o medico
        ref: 'Usuario',
        required: true
    },
    motivo: {

        type: String,
        required: true

    },
    nombre: {
        type: String,
        required: true
    },

    parestesco: {
        type: String
    },

    identificacion: {
        type: String

    },
    entrega: {
        type: String
    },

    fecha: {
        type: Date
    },

    firmau: {
        type: String
    },


});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
SolicitudHSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('SolicitudH', SolicitudHSchema);