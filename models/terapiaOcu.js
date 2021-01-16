const { Schema, model } = require('mongoose');


const TerapiaOcuSchema = Schema({

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
    procedimiento: {
        type: String,

    },
    diagnostico: {
        type: String
    },


    otrosD: {
        type: String
    },

    tolerancia: {
        type: String

    },
    deformidades: {
        type: String
    },
    edema: {
        type: String
    },
    rangoA: {
        type: String

    },
    fuerzaM: {
        type: String
    },
    reacciones: {
        type: String
    },
    control: {
        type: String
    },
    marcha: {
        type: String
    },
    coordinacion: {
        type: String
    },
    destreza: {
        type: String
    },
    vista: {
        type: String
    },
    oido: {
        type: String
    },
    sensibilidad: {
        type: String
    },
    propiocepcion: {
        type: String
    },
    conciencia: {
        type: String
    },
    atencion: {
        type: String
    },
    memoria: {
        type: String
    },
    orientacion: {
        type: String
    },
    esquema: {
        type: String
    },
    afasia: {
        type: String
    },
    apraxia: {
        type: String
    },
    agnosia: {
        type: String
    },
    funciones: {
        type: String
    },
    interes: {
        type: String
    },
    autocontrol: {
        type: String
    },
    habilidades: {
        type: String
    },
    problemas: {
        type: String
    },
    estado: {
        type: String
    },
    objetivos: {
        type: String
    },
    actividades: {
        type: String
    },
    fecha: {
        type: Date
    }


});


TerapiaOcuSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;

    return object;
})


module.exports = model('terapiaocu', TerapiaOcuSchema);