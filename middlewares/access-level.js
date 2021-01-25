/* const { hasAccess } = require('mongoose-role'); */

const hasAccess = (req, res, next) => {

    /* const { role } = req.body; */

    if (req.session.user && req.session.user.hasAccess(accessLevel)) {
        return next();
    }
    return res.json({
        ok: false,
        errors: 'Usuario No Autorizado'
    });


};


module.exports = {
    hasAccess
}