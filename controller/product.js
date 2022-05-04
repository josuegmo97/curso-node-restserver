const { Product } = require('../models')

// Paginado - total - populate
const productsGet = async (req, res) => {

    const { limit = 5, from = 0 } = req.query
    const query = { state: true }

    try {

        const [products, total] = await Promise.all([
            Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .limit(limit)
                .skip(from),

            Product.countDocuments(query)
        ])

        res.json({
            total,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
}

//  populate
const productGet = async (req, res) => {

    const { id } = req.params

    try {
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name')

        res.json({
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error' })
    }
}

const productPost = async (req, res) => {

    const { name,
        category,
        price,
        description } = req.body
    

    try {
        const productDB = await Product.findOne({ name });

        if (productDB) {
            return res.status(400).json({ msg: `Product ${name} has been already use.` })
        }

        const data = {
            name: name.toUpperCase(),
            category,
            price,
            description,
            category,
            user: req.user._id
        }

        const product = new Product(data)
        await product.save()

        res.status(201).json({ product })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: `Error in server.` })

    }
}

const productPut = async (req, res = response) => {

    const { id } = req.params
    const { name, price, description } = req.body

    const data = {
        name: name.toUpperCase(),
        price,
        description
    }

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    res.json({ id, product })
}

const productDelete = async (req, res = response) => {

    const { id } = req.params
    await Product.findByIdAndUpdate(id, { state: false }, { new: true })
    res.json({ id, msg: "Product deleted sucessfully" })

}

module.exports = {
    productPost,
    productsGet,
    productGet,
    productPut,
    productDelete
}