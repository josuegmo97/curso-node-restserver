const jwt = require('jsonwebtoken')

const JWTgenerate = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err ){
                console.log(err)
                reject('Erro creating token')
            }else{
                resolve(token)
            }
        })

    });

}


module.exports = {JWTgenerate}