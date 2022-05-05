
const { Role, User, Category, Product } = require('../models/')

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

const existsCategoryById = async ( id ) => {

    const category = await Category.findById(id)
    
    if(!category || !category.state) {
        throw new Error(`Category not found`)
    }
}

const existsProductById = async ( id ) => {

    const product = await Product.findById(id)
    
    if(!product || !product.state) {
        throw new Error(`Product not found`)
    }

}

const colectionsAllows = ( argument = '', allows = []) => {

   if(!allows.includes(argument)){
       throw new Error('This colection is not allow');
   }

   return true;

}

module.exports = {
    isValidRol,
    existsEmail,
    existsUserById,
    existsCategoryById,
    existsProductById,
    colectionsAllows
}