
const Role = require('../models/role')
const User = require('../models/user')

const isValidRol = async (role = '') => {
    const existsRol = await Role.findOne({role})
    if(!existsRol){
        throw new Error(`Rol ${role} not found in db`)
    }
}

const existsEmail = async (email = '') => {
    const user = await User.findOne({email})
    if(user) {
        throw new Error(`${email} has been already use`)
    }
}

const existsUserById = async ( id ) => {
    const user = await User.findById(id)
    if(!user) {
        throw new Error(`User not found`)
    }
}

module.exports = {
    isValidRol,
    existsEmail,
    existsUserById
}