const { Schema, model } = require('mongoose');


const ParejaSchema = Schema({

    nombreyapellido: {
        type: String,
        required: true
    },
    lugarnacimiento: {
        type: String,
        required: true,

    },
    fechanacimiento: {
        type: Date,
        required: true
    },
    ocupacion: {
        type: String,
        required: true,

    },

    direccion: {
        type: String,
        required: true,


    },
    telefono: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,

    },
    escolaridad: {
        type: String,
        required: true,

    },
    estrato: {
        type: String,
        required: true,

    },
    eps: {
        type: String,
        required: true,

    },
    nombreyapellido2: {
        type: String,
        required: true
    },
    lugarnacimiento2: {
        type: String,
        required: true,

    },
    fechanacimiento2: {
        type: Date,
        required: true
    },
    ocupacion2: {
        type: String,
        required: true,

    },

    direccion2: {
        type: String,
        required: true,


    },
    telefono2: {
        type: String,
        required: true
    },
    cedula2: {
        type: String,
        required: true,

    },
    escolaridad2: {
        type: String,
        required: true,

    },
    estrato2: {
        type: String,
        required: true,

    },
    eps2: {
        type: String,
        required: true,

    }


});

/* para cambiar e _id de mongo por uid ; comprobar con postman   */
ParejaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})

/* exporto el modelo para poder crear una pareja */
module.exports = model('Pareja', ParejaSchema);