const { Schema, model } = require('mongoose');


const TerapiaPSchema = Schema({

    pareja: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la terapia tiene que ser de una pareja
        ref: 'Pareja',
        required: true
    },
    usuario: {

        type: Schema.Types.ObjectId, // esto indica a moogoze que la terapia tiene que ser hecha por un usuario o medico
        ref: 'Usuario',
        required: true
    },
    motivo: {

        type: String,
        required: true

    },
    evolucion: {
        type: String,
        required: true
    },
    caracteristicaf: {
        type: Array
    },


    historiap: {
        type: String
    },

    relacionesa: {
        type: String

    },
    opinion: {
        type: String
    },
    objetivos: {
        type: String
    },

    proximas: {
        type: String
    },
    observaciones: {
        type: String
    },
    fecha: {
        type: Date
    }


});

/* para cambiar e _id de mongo por uid ; comprobar con postman REAL  */
TerapiaPSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('TerapiaP', TerapiaPSchema);