const { response } = require("express");
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { JWTgenerate } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                msg: 'User / Passord do not match - email'
            });
        }

        // Verificar user activo
        if(!user.state){
            return res.status(400).json({
                msg: 'User / Passord do not match - status: false'
            });
        }

        // Verificar pw
        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'User / Passord do not match - password'
            });
        }

        // Generar el JWT
        const token = await JWTgenerate(user.id)

        res.json({
            token,user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Error in the query'
        })
    }


}

module.exports = {
    login
}