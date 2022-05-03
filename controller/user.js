const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')
const Role = require('../models/role.js')

const usersGet = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query
    const query = { status: true }

    // const users = await User.find(query)
    //     .skip(from)
    //     .limit(limit)

    // const total = await User.countDocuments(query)

    const [total, users] = await Promise.all([
        User.countDocuments(query),

        User.find(query)
            .skip(from)
            .limit(limit)
    ])

    res.json({
        users, total
    })
}

const usersPut = async (req, res = response) => {

    const { id } = req.params
    const { password, google, ...resto } = req.body

    // TODO: validar contra bd
    if (password) {
        // Encriptar
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto, { new: true })


    res.json({ id, user })
}

const usersPost = async (req, res = response) => {

    const { name, email, password, img, rol, state, google } = req.body

    const user = new User({
        name, email, password, rol
    });


    // Encriptar
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    //Guardar
    await user.save()

    res.json({ user })
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params

    // Fisicamente borrado
    // const user = await User.findByIdAndDelete(id)

    //Borrado referencial
    const user = await User.findByIdAndUpdate(id, {state: false}, {new: true})

    res.json({ user })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
}