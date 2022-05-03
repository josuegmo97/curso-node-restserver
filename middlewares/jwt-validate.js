const { response } = require("express")
const jwt = require("jsonwebtoken")
const  User = require('../models/user')

const jwtValidate = async (req, res = response, next) => {
    
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token undefined'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY)

        const user = await User.findById(uid).select('-password -__v')

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }

        if ( !user.state ){
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }
        req.user = user


        // jwt
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token invalid'
        })
    }
}

module.exports = {
    jwtValidate
}
