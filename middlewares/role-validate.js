
const isAdminRole = (req, res, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Token no verified"
        })
    }


    const { rol, nombre } = req.user

    if (rol !== 'ADMIN_ROLE') {
        return res.json({
            msg: 'Not access Role'
        })
    }

    next()

}

const hasRole = (...roles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: "Token no verified"
            })
        }

        if( !roles.includes( req.user.rol)){
            return res.status(500).json({
                msg: "Not access"
            })
        }

        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}