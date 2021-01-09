const { Schema, model } = require('mongoose');


const HistoriaNSchema = Schema({

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
    motivoA: {

        type: String,
        required: true

    },
    motivoN: {

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


    historiaf: {
        type: String
    },

    relacionesa: {
        type: String

    },
    recuperacion: {
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
HistoriaNSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear un usuario */
module.exports = model('HistoriaN', HistoriaNSchema);