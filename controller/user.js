const { response } = require('express')

const usersGet = (req, res = response) => {
    res.json({ msg: 'get API' })
}

const usersPut = (req, res = response) => {

    const { id } = req.params
    res.json({ msg: 'put API', id })
}

const usersPost = (req, res = response) => {
    res.json({ msg: 'post API', body: req.body })
}

const usersDelete = (req, res = response) => {
    res.json({ msg: 'delete API' })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
}