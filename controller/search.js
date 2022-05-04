const { response } = require('express')
const { isValidObjectId } = require("mongoose");
const { User, Category, Product } = require('../models')

const colectionsAvailables = [
    'users',
    'products',
    'categories',
    'roles'
];

const searchUser = async (termino = '', res = response) => {

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const user = await User.findById(termino)
        res.json({
            results: (user) ? [user] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    })

    res.json({ results: (users) ? [users] : [] })

}

const searchCategory = async (termino = '', res = response) => {

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const category = await Category.findById(termino)
        res.json({
            results: (category) ? [category] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorys = await Category.find({ name: regex, state: true })
    
    res.json({ results: (categorys) ? [categorys] : [] })

}

const searchProduct = async (termino = '', res = response) => {

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const product = await Product.findById(termino).populate('category', 'name')
        res.json({
            results: (product) ? [product] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const products = await Product.find({ name: regex, state: true }).populate('category', 'name')
    
    res.json({ results: (products) ? [products] : [] })

}

const search = async (req, res = response) => {

    const { colection, termino } = req.params;

    if (!colectionsAvailables.includes(colection)) {
        return res.status(400).json({ msg: `Collections available are ${colectionsAvailables}` })
    }

    switch (colection) {
        case 'users':
            searchUser(termino, res)
            break;
        case 'products':
            searchProduct(termino, res)
            break;
        case 'categories':
            searchCategory(termino, res)
            break;
        default:
            res.status(500).json({ msg: 'Search not implemented' })
            break;
    }

    return
}


module.exports = {
    search
}